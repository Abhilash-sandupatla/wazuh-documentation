.. Copyright (C) 2021 Wazuh, Inc.

.. _release_4_1_2:

4.1.2 Release notes
===================

This section lists the changes in version 4.1.2. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.1-7.10/CHANGELOG.md>`_


Wazuh core
----------

Changed
^^^^^^^

- Agent status management is improved and its default value is configurable if required. Now, the default value of the ``agents_disconnection_time`` is set to 10 minutes, preventing false-positives alerts of disconnected agents.
- In Remoted, the warning log of messages sent to disconnected agents is now changed to level-1 debug log.

**API**

- API logs showing request parameters and body are now generated with an improved API log level ``info`` instead of log level ``debug``.

**External dependencies**

- ``aiohttp`` is upgraded from 3.6.2 to 3.7.4.

Fixed
^^^^^
- Issue with unit tests that randomly caused false failures is fixed.
- Analysisd configuration now applies the ``json_null_fields`` setting successfully.
- In Remoted, the ``ipv6`` option checking ignores invalid values correctly.
- Issue with ``rids_closing_time`` option checking in Remoted is now fixed.


Wazuh Kibana plugin
-------------------

Added
^^^^^

- Some prompts are refactored and improved.
- ``run_as`` setting is now added to example host configuration in Add new API view. 

Fixed
^^^^^

- SCA policy detail no longer shows name and check results of another policy.
- Alerts are now correctly displayed in the alerts table when switching pinned agents.
- In Role mapping, issue with data loading and Create Role mapping button is now fixed. 
- Pagination in SCA checks table when expanding a row now works correctly.
- Agent table shows suggestions with manager information.
- Loading of inventory is now disabled when a request fails.
- Single nodes can be restarted using optional ``node-name`` parameter in cluster restart requests.
- Pinned agents successfully trigger new filtered queries.
- Issue with overlay of Wazuh menu when Kibana menu is opened or docked is now fixed.