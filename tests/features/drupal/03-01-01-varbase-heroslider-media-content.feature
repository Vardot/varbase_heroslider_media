@varbase_heroslider_media @content
Feature: Media Hero Slider - hero slider content
  As a content editor
  I want hero slider nodes to be listed and editable, and to redirect to the
  front page (they are shown through the slider block, not as standalone pages)

  Background:
    Given I am a logged in user with the "Webmaster" user

  Scenario: The content admin lists the seeded hero slider
    When I go to "/admin/content"
    Then I should see "Demo Hero Slider"

  # Hero slider nodes use Rabbit Hole page_redirect to the front page (they are
  # shown through the slider block, not as standalone pages). Asserting the
  # redirect target's content is environment-dependent; @wip until a URL/path
  # assertion step is wired.
  @wip
  Scenario: A hero slider node redirects to the front page (Rabbit Hole)
    When I go to "/node/1"
    Then I should see "No front page content has been created yet."

  Scenario: The hero slider node can be edited with its slide fields
    When I go to "/node/1/edit"
    Then I should see "Slide text"
    And I should see "Slide media"
