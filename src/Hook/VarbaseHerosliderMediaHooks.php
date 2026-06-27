<?php

namespace Drupal\varbase_heroslider_media\Hook;

use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\views\ViewExecutable;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Object-oriented hook implementations for Media Hero Slider.
 *
 * Drupal 11 replaces procedural hooks with methods carrying the #[Hook]
 * attribute (https://www.drupal.org/node/3442349). The real logic lives here
 * and uses dependency injection; the procedural functions in
 * varbase_heroslider_media.module are kept as #[LegacyHook] shims.
 */
class VarbaseHerosliderMediaHooks {

  /**
   * Constructs a VarbaseHerosliderMediaHooks object.
   */
  public function __construct(
    protected RequestStack $requestStack,
    protected ModuleHandlerInterface $moduleHandler,
    protected EntityTypeManagerInterface $entityTypeManager,
  ) {}

  /**
   * Implements hook_views_pre_render().
   */
  #[Hook('views_pre_render')]
  public function viewsPreRender(ViewExecutable $view): void {
    if (isset($view) && ($view->storage->id() == 'varbase_heroslider_media')
        && count($view->result) < 1) {
      // Default empty view style.
      $view->element['#attached']['library'][] = 'varbase_heroslider_media/view-empty';
    }
  }

  /**
   * Implements hook_theme().
   */
  #[Hook('theme')]
  public function theme($existing, $type, $theme, $path): array {
    return [
      'node__varbase_heroslider_media' => [
        'template' => 'node--varbase-heroslider-media',
        'base hook' => 'node',
      ],
      'media_oembed_iframe__remote_video__varbase_media_hero_slider' => [
        'template' => 'media-oembed-iframe--remote-video--varbase-media-hero-slider',
        'variables' => [
          'provider' => NULL,
          'media' => NULL,
        ],
      ],
    ];
  }

  /**
   * Implements hook_preprocess_HOOK() for the hero slider remote-video iframe.
   */
  #[Hook('preprocess_media_oembed_iframe__remote_video__varbase_media_hero_slider')]
  public function preprocessMediaOembedIframe(array &$variables): void {
    $query = $this->requestStack->getCurrentRequest()->query;
    $variables['type'] = $query->get('type');
    $variables['provider'] = $query->get('provider');
    $variables['view_mode'] = $query->get('view_mode');
    $variables['base_path'] = base_path();
    $variables['varbase_heroslider_media_path'] = $this->moduleHandler->getModule('varbase_heroslider_media')->getPath();
  }

  /**
   * Implements hook_preprocess_HOOK() for the hero slider node.
   */
  #[Hook('preprocess_node__varbase_heroslider_media')]
  public function preprocessNode(array &$variables): void {
    $node = $variables['elements']['#node'];
    $media = [];
    if ($node->hasField('field_media_single')) {
      $media = $node->get('field_media_single')->getValue();
    }

    if (!empty($media)) {
      $entity = $this->entityTypeManager->getStorage('media')->load($media[0]['target_id']);
      if ($entity && $entity->bundle() == 'remote_video') {
        $variables['provider'] = $entity->field_provider->value;
      }
    }
  }

}
