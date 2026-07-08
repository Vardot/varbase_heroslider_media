@varbase_heroslider_media @permissions
Feature: Media Hero Slider - hero slider create access by role
  Scenario: Anonymous users cannot create a hero slider
    Given I am an anonymous user
    When I am on "/node/add/varbase_heroslider_media"
    Then I should see "Access denied"

  Scenario: Authenticated users without permission cannot create a hero slider
    Given I am a logged in user with the "Normal user" user
    When I am on "/node/add/varbase_heroslider_media"
    Then I should see "Access denied"

  Scenario: Hero editors can open the hero slider create form
    Given I am a logged in user with the "Hero editor" user
    When I am on "/node/add/varbase_heroslider_media"
    Then I should see "Create Hero slider"
    And I should see "Slide media"
