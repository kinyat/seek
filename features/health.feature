Feature: Health

  Scenario: check health
    When I send a "GET" request to "/hello"
    Then I should have received "200" HTTP code
    And the response I received should contain "Hello world, the time is currently"
