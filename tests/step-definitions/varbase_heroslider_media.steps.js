'use strict';

/**
 * @file
 * Custom step definitions for the Media Hero Slider (varbase_heroslider_media)
 * test suite.
 *
 * The suite reuses the step definitions that ship with varbase-e2e (navigation,
 * forms, web-first assertions). The only module-specific step is logging in as
 * a named user from cucumber.js worldParameters.users, because varbase-e2e does
 * not ship a Drupal form-login step. Every Hero slider behavior (the content
 * type, its Slide text / Slide media / Call-to-action fields, the create form
 * and the create-access matrix) is asserted with the built-in steps against the
 * paths and visible labels the module's default recipe provisions.
 */



