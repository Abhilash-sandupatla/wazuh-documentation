.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the Integrator daemon, which allows Wazuh to connect to external APIs, as well as alerting tools such as Slack, PagerDuty, and VirusTotal.
  
.. _manual_integration:

Integration with external APIs
==============================

The **Integrator** daemon allows Wazuh to connect to external APIs and alerting tools such as Slack, PagerDuty, and VirusTotal.

Configuration
-------------

The integrations are configured on the Wazuh manager ``ossec.conf`` file which is located inside the Wazuh installation folder (``/var/ossec/etc/``). To configure an integration, add the following configuration inside the *<ossec_config>* section:

.. code-block:: xml

  <integration>
    <name> </name>
    <hook_url> </hook_url> <!-- Required for Slack -->
    <api_key> </api_key> <!-- Required for PagerDuty and VirusTotal -->
    <alert_format>json</alert_format> <!-- Required for Slack, VirusTotal and Shuffle -->

    <!-- Optional filters -->
    <rule_id> </rule_id>
    <level> </level>
    <group> </group>
    <event_location> </event_location>
  </integration>


After enabling the daemon and configure the integrations, restart the Wazuh manager to apply the changes:

.. include:: /_templates/common/restart_manager.rst


Optional filters
^^^^^^^^^^^^^^^^

The `Integrator` daemon uses the `optional filters` fields to determine which alerts should be sent to the external platforms. Only the alerts that meet the filter conditions are sent. If no filters are specified, all alerts are sent.

The following considerations must be taken into account when the filters are set:
   
   - It is possible to specify multiple group names using the ``<group>`` field with a comma-separated list. If the alert's group matches any of the groups in the list, the alert is sent. Otherwise, it is ignored.
   - It is possible to specify multiple rule IDs using the ``<rule_id>`` field with a comma-separated list. If the alert's rule ID matches any of the IDs in the list, the alert is sent. Otherwise, it is ignored.
   - It is possible to specify the previously described fields together. If both the alert's rule ID and group match any of the IDs and groups in the lists, the alert is sent. Otherwise, it is ignored.

.. note::
  It is recommended to carefully check the groups and rule identifiers mentioned above, as defining them incorrectly will result in expected alerts not being sent to the integration.

The full configuration reference for the Integrator daemon can be found :ref:`here <reference_ossec_integration>`.

Slack
-----

This integration allows receiving alerts into a Slack channel thanks to the `Incoming Webhooks <https://api.slack.com/incoming-webhooks>`_, a simple way to post messages from 3rd-party apps (in this case, Wazuh).

This is an example configuration for the Slack integration:

.. code-block:: xml

  <integration>
    <name>slack</name>
    <hook_url>https://hooks.slack.com/services/...</hook_url> <!-- Replace with your Slack hook URL -->
    <alert_format>json</alert_format>
  </integration>

PagerDuty
---------

`PagerDuty <https://www.pagerduty.com/>`_ is a SaaS incident response platform suitable for IT departments. This integration allows creating a service using its official API in order to receive Wazuh alerts on the Incidents Dashboard.

This is an example configuration for the PagerDuty integration:

.. code-block:: xml

  <integration>
    <name>pagerduty</name>
    <api_key>API_KEY</api_key> <!-- Replace with your PagerDuty API key -->
  </integration>

As seen on the screenshot below, alerts start coming into the dashboard:

.. thumbnail:: ../../images/manual/integration/pagerduty.png
  :title: PagerDuty Incidents Dashboard
  :align: center
  :width: 80%

VirusTotal
----------

This integration allows the inspection of malicious files using the VirusTotal database. Find more information about this at the :ref:`VirusTotal integration <virustotal-scan>` page.

This is an example configuration for the VirusTotal integration:

.. code-block:: xml

  <integration>
    <name>virustotal</name>
    <api_key>API_KEY</api_key> <!-- Replace with your VirusTotal API key -->
    <group>syscheck</group>
    <alert_format>json</alert_format>
  </integration>

Shuffle
-------

`Shuffle <https://shuffler.io/>`_ is an Open Source interpretation of SOAR. It aims to bring all the capabilities necessary to transfer data throughout an enterprise with plug-and-play Apps. This integration allows sending alerts into a Shuffle workflow thanks to the `Wazuh Webhook <https://shuffler.io/docs/extensions#wazuh>`_, a simple way to send alerts from Wazuh to Shuffle.

This is an example configuration for the Shuffle integration:

.. code-block:: xml

   <integration>
      <name>shuffle</name>
      <hook_url>http://IP:3001/api/v1/hooks/HOOK_ID</hook_url> <!-- Replace with your Shuffle hook URL -->
      <level>3</level>
      <alert_format>json</alert_format>
   </integration>

.. note::
   The Shuffle default installation is done using `docker-compose`. If the Wazuh installation is done on the same network as Shuffle, it's not necessary to specify port ``3001`` in the ``<hook_url>`` field.

Custom integration
------------------

The integrator tool is able to connect wazuh with other external software. Read the `How to integrate external software using Integrator <https://wazuh.com/blog/how-to-integrate-external-software-using-integrator//>`_ document for more information.

This is an example configuration for a custom integration:

.. code-block:: xml

  <!--Custom external Integration -->
  <integration>
    <name>custom-integration</name>
    <hook_url>WEBHOOK</hook_url>
    <level>10</level>
    <group>multiple_drops,authentication_failures</group>
    <api_key>APIKEY</api_key> <!-- Replace with your external service API key -->
    <alert_format>json</alert_format>
  </integration>
