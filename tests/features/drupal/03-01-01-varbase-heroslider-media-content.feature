@varbase_heroslider_media @content
Feature: Media Hero Slider - hero slider content
  As a content editor
  I want hero slider nodes to render

  Background:
    Given I am a logged in user with the "Webmaster" user

  Scenario: The content admin lists the seeded hero slider
    When I go to "/admin/content"
    Then I should see "Demo Hero Slider"

  Scenario: The seeded hero slider node renders
    When I go to "/node/1"
    Then I should see "Demo Hero Slider"

  Scenario: The hero slider node can be edited with its slide fields
    When I go to "/node/1/edit"
    Then I should see "Slide text"
    And I should see "Slide media"
