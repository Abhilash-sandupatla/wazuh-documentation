.. Copyright (C) 2020 Wazuh, Inc.

.. _restful-api-remove:

Remove agents using the Wazuh API
----------------------------------

The request :api-ref:`DELETE /agents <operation/api.controllers.agent_controller.delete_agents>` removes the specified agents.

.. code-block:: console

    # curl -k -X DELETE "https://localhost:55000/agents?pretty=true&older_than=0s&agents_list=005,006,007&status=all" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
        "data": {
            "affected_items": [
                "005",
                "006",
                "007"
            ],
            "total_affected_items": 3,
            "total_failed_items": 0,
            "failed_items": [],
            "older_than": "0s",
        },
        "message": "All selected agents were deleted",
        "error": 0,
    }
