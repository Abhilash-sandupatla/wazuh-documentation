.. Copyright (C>`_ 2021 Wazuh, Inc.

.. _release_4_1_3:

4.1.3 Release notes
===================

This section lists the changes in version 4.1.3. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.1-7.10/CHANGELOG.md>`_


Wazuh core
----------

What's new
^^^^^^^^^^

This release includes new features or enhancements. 

**External dependencies:**

- `#7943 <https://github.com/wazuh/wazuh/pull/7943>`_ Python is upgraded from 3.8.6 to 3.9.2. This upgrading includes several Phyton dependencies to be compatible with the latest stable version. 

Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

**Core**

======================================================  =============
Reference                                                Resolution
======================================================  =============
`#7870 <https://github.com/wazuh/wazuh/pull/7870>`_     In File Integrity Monitoring, the issue with files' modification time on Windows is fixed. Now, the CreateFile function works correctly and includes all the necessary permissions to examine a file when it is opened by another application.
`#7873 <https://github.com/wazuh/wazuh/pull/7873>`_     Issue when requesting a ``sync-agent-info-get`` query to a cluster is now fixed and the response output of the agents' status query works correctly.
======================================================  =============

**API** 

======================================================  =============
Reference                                                Resolution
======================================================  =============
`#7906 <https://github.com/wazuh/wazuh/pull/7906>`_     Validation for absolute and relative paths is modified to avoid inconsistencies. These changes in the ``validator.py`` module improve security verifications of paths.
======================================================  =============

Wazuh Kibana plugin
-------------------

What's new
^^^^^^^^^^

This release includes new features or enhancements. 

- `#2985 <https://github.com/wazuh/wazuh-kibana-app/pull/2985>`_ In the Settings module, you can now create and configure a new index pattern after changing the default one. This improves user experience when retrieving data from indices for queries and visualizations. 
- `#3039 <https://github.com/wazuh/wazuh-kibana-app/pull/3039>`_ In the Agents module, the node name information is now detailed in the agents’ list and in the agent information section. With this enhancement, you can better visualize the cluster node to which each agent is reporting.  
- `#3041 <https://github.com/wazuh/wazuh-kibana-app/pull/3041>`_ A new loading view is displayed when the user is logging some tabs. This improves user experience since permission prompts are no longer shown while updating a tab.  
- `#3047 <https://github.com/wazuh/wazuh-kibana-app/pull/3047>`_ All date labels are changed to Kibana formatting time zone for consistency.

Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

==============================================================    =============
Reference                                                         Resolution
==============================================================    =============
`#3028 <https://github.com/wazuh/wazuh-kibana-app/pull/3028>`_    In Role mapping, the issue that caused unnecessary operators to be added when editing the role mapping is now fixed and no longer affects usability.
`#3049 <https://github.com/wazuh/wazuh-kibana-app/pull/3049>`_    When selecting a default API, the toast message is cleaner and shows the API host ID.
`#3057 <https://github.com/wazuh/wazuh-kibana-app/pull/3057>`_    Issue with rule filter not applied when selecting a Rule ID in another module is now fixed. Now, the selected Rule ID is correctly applied throughout all modules.
`#3062 <https://github.com/wazuh/wazuh-kibana-app/pull/3062>`_    Issue with changing master node configuration is now fixed. Now, the Wazuh API connection checking is completed successfully and no longer triggers an error when changing the configuration of the master node.
`#3063 <https://github.com/wazuh/wazuh-kibana-app/pull/3063>`_    Issue with Wazuh crashing after reloading due to caching bundles is now fixed. Improved validations now prevent this issue from reoccurring.
`#3084 <https://github.com/wazuh/wazuh-kibana-app/pull/3084>`_    Improved error handling when an invalid rule is configured. The file saving algorithm now prevents files with incorrect configurations from being saved.
`#3086 <https://github.com/wazuh/wazuh-kibana-app/pull/3086>`_    Some errors in the Events table are now fixed. Action buttons of the ``rule.mitre.tactic`` column are repositioned correctly and Event links work after you add, remove, or move a column.
==============================================================    =============
