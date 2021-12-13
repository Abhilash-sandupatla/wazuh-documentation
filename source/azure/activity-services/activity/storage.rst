.. Copyright (C) 2021 Wazuh, Inc.

.. _azure_storage:

.. meta::
  :description: Discover the numerous ways that Wazuh provides to monitor your Microsoft Azure infrastructure activity.


Using Azure Storage
===================

`Azure Storage <https://docs.microsoft.com/en-us/azure/storage/common/storage-introduction>`_ refers to Microsoft Azure cloud storage by providing a massively scalable object store for data objects, a messaging store for reliable messaging, a file system service for the cloud, and a NoSQL store.

.. thumbnail:: ../../../images/azure/storage_activity_log.png
    :title: Storage
    :align: center
    :width: 50%

As an alternative to the Azure Log Analytics REST API, Wazuh offers the possibility to access Azure Storage accounts in a simple way. The activity logs of the Microsoft Azure infrastructure can be exported to the storage accounts.

This section explains how to use the Azure portal to archive the Azure activity log in a storage account, how to configure the ``azure-logs`` module. Finally, a usage case will be provided for a better understanding of this topic.


Configuring the Activity log export
-----------------------------------

To export the logs look for the ``Activity log`` service. It can be found by typing "Activity" in the search engine. From there, access the ``Audit Logs`` section and click on ``Export Data Settings``:

.. thumbnail:: ../../../images/azure/storage_activity1.png
    :title: Storage
    :align: center
    :width: 50%

Then click on ``Add diagnostic setting``:

.. thumbnail:: ../../../images/azure/storage_activity2.png
    :title: Storage
    :align: center
    :width: 50%

Check the ``AuditLogs`` box and the ``Archive to storage account``, selecting the name of the subscription and the Storage account to export the logs:

.. thumbnail:: ../../../images/azure/storage_activity3.png
    :title: Storage
    :align: center
    :width: 50%


Azure Storage Use Case
----------------------

This is a basic example of how to monitor the activity of the infrastructure. A new user will be created to trigger, resulting in a Azure Activity Log that will be exported to Storage if the Activity Log export was configured successfully.

Creating a user
^^^^^^^^^^^^^^^

An easy way to test this configuration is to create a new user in Azure Active Directory. A few minutes after the creation of the user a new log will be available in a container named ``insights-logs-auditlogs`` inside the Storage account specified when configuring the Activity log export.

.. thumbnail:: ../../../images/azure/storage_new_user1.png
    :title: Storage
    :align: center
    :width: 100%

.. thumbnail:: ../../../images/azure/storage_new_user2.png
    :title: Storage
    :align: center
    :width: 100%

Wazuh configuration
^^^^^^^^^^^^^^^^^^^

Proceed to configure the ``azure-logs`` module in the local configuration (``ossec.conf``). It is important to set the **account_name** and **account_key** of the Storage account to authenticate. It can be found in the ``Access keys`` section of ``Storage accounts``. Check the :ref:`credentials <azure_credentials>` reference for more information about the different authentication options available.

.. thumbnail:: ../../../images/azure/account_credentials.png
    :title: Storage
    :align: center
    :width: 50%

.. note::
    Check the :ref:`credentials <azure_credentials>` reference page for more information about the different authentication options available.


Using the following configuration the integration will be executed everyday, using a credentials file for authentication . The contents of the ``insights-operational-logs``, downloading every blob available with ``.json`` extension from the last ``24 hours``. The content for these blobs is expected to be in ``json_inline`` format:

.. warning:: As of November 1st 2018, the format of logs stored in Azure accounts became inline JSON (``json_inline`` in Wazuh) and the previous format became obsolete (``json_file`` in Wazuh).

.. code-block:: xml

    <wodle name="azure-logs">

        <disabled>no</disabled>
        <interval>1d</interval>
        <run_on_start>yes</run_on_start>

        <storage>

                <auth_path>/home/manager/Azure/storage_auth.txt</auth_path>
                <tag>azure-activity</tag>

                <container name="insights-operational-logs">
                    <blobs>.json</blobs>
                    <content_type>json_inline</content_type>
                    <time_offset>24h</time_offset>
                </container>

        </storage>
    </wodle>

Check the :ref:`Azure module <wodle_azure_logs>` reference page to learn more about the parameters available and how to use them.

Wazuh Rules
^^^^^^^^^^^

Thanks to the following rules, already included in Wazuh by default, it it possible to monitor the infrastructure activity and get the related alerts:

.. code-block:: xml

    <rule id="87803" level="3">
        <decoded_as>json</decoded_as>
        <field name="azure_tag">azure-storage</field>
        <description>Azure: Storage</description>
    </rule>

    <rule id="87813" level="3">
        <if_sid>87803</if_sid>
        <field name="operationName">\.+</field>
        <description>Azure: Storage: $(OperationName)</description>
    </rule>


Alert visualization
^^^^^^^^^^^^^^^^^^^

Once the Wazuh configuration is set and the ``azure-logs`` module run using the previous configuration the event from the user creation example and exported to Storage will be processed. The results can be check in Wazuh UI:

.. thumbnail:: ../../../images/azure/storage_kibana.png
    :title: Storage
    :align: center
    :width: 100%