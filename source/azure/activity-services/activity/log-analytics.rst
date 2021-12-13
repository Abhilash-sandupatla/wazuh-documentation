.. Copyright (C) 2021 Wazuh, Inc.

.. _azure_log_analytics:

.. meta::
  :description: Discover the numerous ways that Wazuh provides to monitor your Microsoft Azure infrastructure activity.

Using Azure Log Analytics
=========================

`Azure Log Analytics <https://docs.microsoft.com/en-us/azure/log-analytics/log-analytics-overview>`_ is a service that monitors your infrastructure offering query capabilities that allow you to perform advanced searches specific to your data.

The Log Analytics solution helps you to analyze and search the Azure activity log in all your Azure subscriptions, providing information about the operations performed with the resources of your subscriptions.

.. thumbnail:: ../../../images/azure/la_activity_send.png
    :title: Microsoft Azure resources
    :align: center
    :width: 60%

The data collected by Log Analytics can be consulted through the **Azure Log Analytics REST API**. The Azure Log Analytics API uses the Azure Active Directory authentication scheme. Part of the installation guide is based on this `tutorial <https://dev.logsanalytics.io/documentation/1-Tutorials/Direct-API>`_.

An qualified application or client is required to use the Azure Log Analytics REST API. This must be configured manually on the Microsoft Azure portal.

.. note:: The process explained below details the creation of an application that will use the of Azure Log Analytics REST API. It is also possible to configure an existing application. If this is the case, skip the ``Creating the application`` step.


Setting up the application
---------------------------

Creating the application
^^^^^^^^^^^^^^^^^^^^^^^^

In the ``Azure Active Directory`` section select the option ``App registrations`` and once inside, select ``New registration``.

.. thumbnail:: ../../../images/azure/logsanalytics1.png
    :title: Log Analytics App
    :align: center
    :width: 100%

Giving permissions to the application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1 - Access the desired application and copy it's ``Application ID`` as this will be required to authenticate the application later. This information can be found in the ``Overview`` section.

.. thumbnail:: ../../../images/azure/logsanalytics2.png
    :title: Log Analytics App
    :align: center
    :width: 100%

2 - Access the ``API permissions`` section and proceed to grant the required permissions to the application.

.. thumbnail:: ../../../images/azure/logsanalytics3.png
    :title: Log Analytics App
    :align: center
    :width: 100%

3 - Look for the ``Log Analytics API``.

.. thumbnail:: ../../../images/azure/logsanalytics4.png
    :title: Log Analytics App
    :align: center
    :width: 100%

4 - Select the ``Read Log Analytics data`` permission from the ``Application permissions``.

.. thumbnail:: ../../../images/azure/logsanalytics5.png
    :title: Log Analytics App
    :align: center
    :width: 100%

5 - Grant admin consent for the tenant domain used for the permission added in the previous step. This must be done by an admin user.

.. thumbnail:: ../../../images/azure/logsanalytics6.png
    :title: Log Analytics App
    :align: center
    :width: 100%

Obtaining the application key for authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Select ``Keys`` and fill in the ``DESCRIPTION`` and ``EXPIRES`` fields. Copy the ``value`` once the key is saved. This is required to authenticate the application in order to use the Log Analytics API.

.. thumbnail:: ../../../images/azure/la_create_key.png
    :title: Log Analytics App
    :align: center
    :width: 100%

.. thumbnail:: ../../../images/azure/la_key_created.png
    :title: Log Analytics App
    :align: center
    :width: 100%

Giving access to our application to the Log Analytics API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1 - Access ``Log Analytics Workspaces`` and create a new workspace or choose an existing one. Then, copy the ``Workspace Id`` value from the ``Overview`` section. This will be used in the Wazuh configuration to allow making requests to the API.

.. thumbnail:: ../../../images/azure/la_workspace_1.png
    :title: Log Analytics App
    :align: center
    :width: 100%

.. thumbnail:: ../../../images/azure/la_workspace_2.png
    :title: Log Analytics App
    :align: center
    :width: 100%

2 - Add the required role to the application in the ``Access control (IAM)`` by clicking the ``add`` button and selecting ``add role assignment``

.. thumbnail:: ../../../images/azure/la_workspace_3.png
    :title: Log Analytics App
    :align: center
    :width: 100%

3 - Fill in the fields as in the following screenshot and click on ``save``. It is important choose the ``User, group, or service principal`` option in the drop down menu and to type the full application name in the ``Select`` field.

.. thumbnail:: ../../../images/azure/la_workspace_4.png
    :title: Log Analytics App
    :align: center
    :width: 100%

Azure Log Analytics use case
----------------------------

Here is an example of monitoring the activity of the infrastructure using the previously mentioned Azure application.

Creating a user
^^^^^^^^^^^^^^^

An easy way to test this is to create a new user in Azure Active Directory. A few minutes after the creation of the user a new log will be available for Log Analytics reflecting this change. The log can be checked using the ``AuditLogs`` query as shown in this screenshot, by accessing ``Log Analytics`` and running the ``AuditLogs`` query.

.. thumbnail:: ../../../images/azure/la_new_user.png
    :title: Log Analytics App
    :align: center
    :width: 100%

Wazuh configuration
^^^^^^^^^^^^^^^^^^^

Proceed to configure the ``azure-logs`` module in the local configuration (``ossec.conf``). The **key and ID of the application** saved during the configuration of the application will be used here, as well as **workspace ID**. In this case, both fields were saved in a **file** for authentication. Check the :ref:`credentials <azure_credentials>` reference for more information about this topic.

Through the following configuration, Wazuh is ready to search for any query accepted by Azure Log Analytics. This example configuration includes a representative ``tag`` and will be scheduled for every Monday at 02:00, using an offset of one day, which means only the log data from the last day will be parsed:

.. code-block:: xml

    <wodle name="azure-logs">
        <disabled>no</disabled>
        <run_on_start>no</run_on_start>

        <log_analytics>

            <auth_path>/home/manager/Azure/log_analytics_auth.txt</auth_path>
            <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>

            <request>
                <tag>azure-auditlogs</tag>
                <query>AuditLogs</query>
                <workspace>d6b...efa</workspace>
                <time_offset>1d</time_offset>
            </request>

        </log_analytics>

    </wodle>

Check the reference for more information about the azure module :ref:`here <wodle_azure_logs>`.

.. warning:: The field ``tenantdomain`` is mandatory. It can be obtain from the ``Overview`` section in the ``Azure Active Directory``

Wazuh Rules
^^^^^^^^^^^

Thanks to the following rules, already included in Wazuh by default, it it possible to monitor the infrastructure activity and get the related alerts:

.. code-block:: xml

    <rule id="87801" level="5">
        <decoded_as>json</decoded_as>
        <field name="azure_tag">azure-log-analytics</field>
        <description>Azure: Log analytics</description>
    </rule>

    <rule id="87810" level="3">
        <if_sid>87801</if_sid>
        <field name="Type">AzureActivity</field>
        <description>Azure: Log analytics activity</description>
    </rule>

    <rule id="87811" level="3">
        <if_sid>87810</if_sid>
        <field name="OperationName">\.+</field>
        <description>Azure: Log analytics: $(OperationName)</description>
    </rule>


Alert visualization
^^^^^^^^^^^^^^^^^^^

Once the Wazuh configuration is set and the ``azure-logs`` module run using the previous configuration the event will be processed. The results can be check in Wazuh UI:

.. thumbnail:: ../../../images/azure/new_user_event.png
    :title: Log Analytics App
    :align: center
    :width: 100%
