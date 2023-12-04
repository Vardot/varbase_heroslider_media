<?php

/**
 * @file
 * Contains List of all varbase_heroslider_media helpers.
 *
 * Add custom needed helper functions.
 */

/**
 * Implements hook_requirements().
 */
function varbase_heroslider_media_requirements($phase) {

  $requirements = [];

  // Check requirements for the Slick library.
  $slick_library_path = DRUPAL_ROOT . '/libraries/slick/slick/slick.js';

  // Is the library found in the root libraries path.
  $slick_library_found = file_exists($slick_library_path);

  // If library is not found, then look in the current profile libraries path.
  if (!$slick_library_found) {
    $profile_path = \Drupal::service('extension.list.profile')->getPath(\Drupal::installProfile());
    $profile_path .= '/libraries/slick/slick/slick.js';
    // Is the library found in the current profile libraries path.
    $slick_library_found = file_exists($profile_path);
  }

  if (!$slick_library_found) {
    $requirements['slick_library'] = [
      'title' => t('slick library missing'),
      'description' => t('Varbase Media Hero Slider requires the Slick library.
        Download it (https://github.com/kenwheeler/slick) and place it in the
        libraries folder (/libraries).
        Use the asset-packagist.org method:
        Make sure to change repositories for Drupal and assets:

        ```
        "repositories": {
          "drupal": {
            "type": "composer",
            "url": "https://packages.drupal.org/8"
          },
          "assets": {
            "type": "composer",
            "url": "https://asset-packagist.org"
          }
        },
        ```

        Add the following in the root composer.json for the project

        ```
        "installer-paths": {
          "docroot/libraries/slick": ["npm-asset/slick-carousel"],
          "docroot/libraries/{$name}": [
            "type:drupal-library",
            "type:bower-asset",
            "type:npm-asset"
          ]
        }

        ```

        And

        ```
        "installer-types": [
          "bower-asset",
          "npm-asset"
        ],
        "drupal-libraries": {
          "library-directory": "docroot/libraries",
          "libraries": [
            {"name": "slick", "package": "npm-asset/slick-carousel"},
          ]
        },
        ```
        No need to add anything else with Varbase Profile

        If the project is a Standard Drupal profile is using Varbase Media Hero Slider, you need to add the following too:
        `"npm-asset/slick-carousel": "~1",`
        '),
      'severity' => REQUIREMENT_ERROR,
    ];
  }

  return $requirements;
}
