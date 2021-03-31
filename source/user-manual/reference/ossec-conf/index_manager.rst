.. Copyright (C) 2020 Wazuh, Inc.

.. _reference_manager_conf:

Manager configuration (manager.conf)
====================================

.. warning::
    Upgrade from older version than v5.0.0, will create a new manager.conf file and current configuration will be saved into ossec.conf.backup file, restarting configuration from zero.

The ``manager.conf`` file is the main configuration file on the Wazuh manager. It is located at ``/var/ossec/etc/manager.conf`` on Linux machines. It is recommended to back up this file before making changes on it. A configuration error may prevent Wazuh services from starting up.

The ``manager.conf`` file is in XML format and all of its configuration options are nested in their appropriate section of the file. In this file, the outermost XML tag is ``<wazuh_config>``. There can be more than one ``<wazuh_config>`` tag.

Here is an example of the proper location of the *alerts* configuration section:

.. code-block:: xml

    <wazuh_config>
        <alerts>
            <!--
            alerts options here
            -->
        </alerts>
    </wazuh_config>

Wazuh can be installed in two ways: as a manager by using the "server/manager" installation type and as an agent by using the "agent" installation type.

+---------------------------------------------------------------------+
| Configuration sections                                              |
+=====================================================================+
| :doc:`active-response <active-response_manager>`                    |
+---------------------------------------------------------------------+
| :doc:`agentless <agentless>`                                        |
+---------------------------------------------------------------------+
| :doc:`agent-upgrade <agent-upgrade_manager>`                        |
+---------------------------------------------------------------------+
| :doc:`alerts <alerts>`                                              |
+---------------------------------------------------------------------+
| :doc:`auth <auth>`                                                  |
+---------------------------------------------------------------------+
| :doc:`cluster <cluster>`                                            |
+---------------------------------------------------------------------+
| :doc:`command <commands>`                                           |
+---------------------------------------------------------------------+
| :doc:`database_output <database-output>`                            |
+---------------------------------------------------------------------+
| :doc:`email_alerts <email_alerts>`                                  |
+---------------------------------------------------------------------+
| :doc:`global  <global>`                                             |
+---------------------------------------------------------------------+
| :doc:`integration  <integration>`                                   |
+---------------------------------------------------------------------+
| :doc:`labels  <labels_manager>`                                     |
+---------------------------------------------------------------------+
| :doc:`logging <logging_manager>`                                    |
+---------------------------------------------------------------------+
| :doc:`remote <remote>`                                              |
+---------------------------------------------------------------------+
| :doc:`reports <reports>`                                            |
+---------------------------------------------------------------------+
| :doc:`rule_test <rule_test>`                                        |
+---------------------------------------------------------------------+
| :doc:`ruleset <ruleset>`                                            |
+---------------------------------------------------------------------+
| :doc:`syslog_output <syslog-output>`                                |
+---------------------------------------------------------------------+
| :doc:`task-manager <task-manager>`                                  |
+---------------------------------------------------------------------+
| :doc:`vulnerability-detector <vuln-detector>`                       |
+---------------------------------------------------------------------+

All of the above sections must be located within the top-level ``<wazuh_config>`` tag. In case of adding another ``<wazuh_config>`` tag, it may override the values set on the previous tag.


.. toctree::
   :hidden:
   :maxdepth: 1


   active-response_manager
   agentless
   agent-upgrade_manager
   alerts
   auth
   cluster
   commands
   database-output
   email_alerts
   global
   integration
   labels_manager
   logging_manager
   remote
   reports
   rule_test
   ruleset
   syslog-output
   task-manager
   vuln-detector
