.. Copyright (C) 2021 Wazuh, Inc.

.. _virtual_machine:

Virtual Machine (OVA)
=====================

Wazuh provides a pre-built virtual machine image (OVA) that you can directly import using VirtualBox or other OVA compatible virtualization systems.

.. note::

  This VM only runs on 64-bit systems and is not recommended for use in production environments. It can be a useful tool for proofs of concept and labs. Multitier server and multi-node clusters are usually a better fit for production environments where higher performance is required.

This virtual appliance, available `here <https://packages.wazuh.com/|CURRENT_MAJOR|/vm/wazuh-|WAZUH_LATEST_OVA|_|OPEN_DISTRO_LATEST|.ova>`_, contains the following components:

    - CentOS 7
    - Wazuh manager: |WAZUH_LATEST_OVA|
    - Open Distro for Elasticsearch: |ELASTICSEARCH_LATEST_OVA|
    - Filebeat-OSS: |ELASTICSEARCH_LATEST_OVA|
    - Kibana: |ELASTICSEARCH_LATEST_OVA|
    - Wazuh Kibana plugin: |WAZUH_LATEST_OVA|-|ELASTICSEARCH_LATEST_OVA|

First, import the OVA in the virtualization platform and run the virtual machine. The user ``root`` password is ``wazuh`` and the username/password for the Wazuh API is ``wazuh-wui/wazuh-wui``. The `following video <https://www.youtube.com/watch?v=uijZuneDPPk>`_ explains how to import and run the virtual machine.

To access the web interface: 

  .. code-block:: none

      URL: https://<wazuh_server_ip>
      user: admin
      password: admin

All the components included in this virtual image are configured to work out of the box without modifying any settings. Nevertheless, all the components can be fully customized. These are the configuration files locations:

  - Wazuh manager: ``/var/ossec/etc/ossec.conf``
  - Open Distro for Elasticsearch: ``/etc/elasticsearch/elasticsearch.yml``
  - Filebeat-OSS: ``/etc/filebeat/filebeat.yml``
  - Kibana: ``/etc/kibana/kibana.yml``

In case of using VirtualBox, once the virtual machine is imported it may run into issues caused by time skew when VirtualBox synchronizes the time of the guest machine. To prevent this situation it is recommended to enable the ``Hardware Clock in UTC Time`` option on the ``System`` tab of the virtual machine's settings.

.. note::
  By default the type of the network interface is bridge. The VM will try to get an IP address from the network's DHCP server. Alternatively, a static IP address can be set by configuring the proper network files on the CentOS operating system that the virtual machine is based on.


Once the virtual machine is imported and running, the next step consists on :ref:`deploying the Wazuh agents <installation_agents>` on the systems to be monitored.

Upgrading the VM
----------------

The virtual machine can be upgraded as a traditional installation:

  - :ref:`Upgrading the Wazuh manager <upgrading_wazuh_server>`
  - :ref:`Upgrading Open Distro for Elasticsearch, Filebeat-OSS and Kibana <upgrading_open_distro>`
