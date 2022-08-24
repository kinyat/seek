Feature: Calculate

  Scenario: calculate suggested resources
    When I send a "POST" request to "/calculate" with the file "./files/metrics-input.json"
    Then I should have received "200" HTTP code
    Then I should received the following json
      """
      {
        "alertmanager": {
          "cpu": {
            "suggestedAllocatedResource": 146.7739239080461,
            "suggestedResourceLimit": 1076.4148
          },
          "memory": {
            "suggestedAllocatedResource": 9.335384133333331,
            "suggestedResourceLimit": 49.20762
          }
        },
        "grafana": {
          "cpu": {
            "suggestedAllocatedResource": 280.6870898850574,
            "suggestedResourceLimit": 956.9601
          },
          "memory": {
            "suggestedAllocatedResource": 63.031599121839086,
            "suggestedResourceLimit": 192.451826
          }
        },
        "prometheus": {
          "cpu": {
            "suggestedAllocatedResource": 12033.906236321836,
            "suggestedResourceLimit": 51344.7488
          },
          "memory": {
            "suggestedAllocatedResource": 1661.6796866206894,
            "suggestedResourceLimit": 5319.97184
          }
        }
      }
      """

  Scenario: invalid request
    When I send a "POST" request to "/calculate" with the following json
      """
      {
        "foo": "bar"
      }
      """
    Then I should have received "400" HTTP code
    Then I should received the following json
      """
      {
        "error": "invalid request"
      }
      """
