@varbase_heroslider_media @node-type
Feature: Media Hero Slider - Hero slider content type
  As a site administrator
  I want a Hero slider content type with slide text, media and call-to-action fields

  Background:
    Given I am a logged in user with the "Webmaster" user

  Scenario: The Hero slider content type is listed
    When I go to "/admin/structure/types"
    Then I should see "Hero slider"

  Scenario: The Hero slider type provides the slide fields
    When I go to "/admin/structure/types/manage/varbase_heroslider_media/fields"
    Then I should see "Slide text"
    And I should see "Slide media (image/video)"
    And I should see "Call for action link"

  Scenario: The Hero slider create form renders its fields
    When I go to "/node/add/varbase_heroslider_media"
    Then I should see "Create Hero slider"
    And I should see "Slide text"
    And I should see "Slide media"
    And I should see "Call for action link"
