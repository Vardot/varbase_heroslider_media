<?php

/**
 * @file
 * Contains varbase_heroslider_media_update_9###(s) hook updates.
 */

use Vardot\Installer\ModuleInstallerFactory;

/**
 * Issue #3272305: Switch to use the Module Installer Factory.
 *
 * In the Varbase Media Hero Slider module.
 */
function varbase_heroslider_media_update_90001() {
  // Set the weight of the module after installation of list of modules.
  // To make sure that any hook or event subscriber works after
  // all used modules.
  ModuleInstallerFactory::setModuleWeightAfterInstallation('varbase_heroslider_media');
}
