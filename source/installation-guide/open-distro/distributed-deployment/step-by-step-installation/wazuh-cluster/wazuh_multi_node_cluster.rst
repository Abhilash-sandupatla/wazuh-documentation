.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _wazuh_multi_node_cluster:


Wazuh multi-node cluster
=========================

This document will go through the installation of the Wazuh server components and Filebeat in a Wazuh multi-node cluster.

.. note:: Root user privileges are required to run all the commands described below.

Prerequisites
-------------

Before installing the Wazuh servers and Filebeat, some extra packages must be installed:

.. include:: ../../../../../_templates/installations/elastic/common/before_installation_kibana_filebeat.rst

Installing the Wazuh server
---------------------------

The Wazuh server collects and analyzes data from the deployed Wazuh agents. It runs the Wazuh manager, the Wazuh API, and Filebeat. The first step to set up Wazuh is adding the Wazuh's repository to the servers, alternatively, all the available packages can be found :ref:`here <packages>`. 

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section describes how to add the Wazuh repository. It will be used for the Wazuh manager, the Wazuh API, and Filebeat installation. These steps must be followed in all the servers that will be part of the Wazuh multi-node cluster:

.. tabs::



    .. group-tab:: Yum


      .. include:: ../../../../../_templates/installations/wazuh/yum/add_repository.rst



    .. group-tab:: APT


      .. include:: ../../../../../_templates/installations/wazuh/deb/add_repository.rst



    .. group-tab:: ZYpp


      .. include:: ../../../../../_templates/installations/wazuh/zypp/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install the Wazuh manager package. This step must be applied in all servers that will act as Wazuh cluster nodes:

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/wazuh/yum/install_wazuh_manager.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/wazuh/deb/install_wazuh_manager.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/wazuh/zypp/install_wazuh_manager.rst



Now, the Wazuh manager has been installed in all the Wazuh cluster nodes. The Wazuh manager is configured as a single-node cluster by default. The following sections will describe how to configure the Wazuh manager as a Wazuh master node or as a Wazuh worker node.

One server has to be chosen as a master, the rest will be workers. So, the section ``Wazuh server master node`` must be applied once, in the server chosen for this role. For all the other servers, the section ``Wazuh server worker node`` must be applied.


Wazuh server master node
~~~~~~~~~~~~~~~~~~~~~~~~

#. .. include:: ../../../../../_templates/installations/wazuh/common/configure_wazuh_master_node.rst


#. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, enable and start the Wazuh manager service:

    .. include:: ../../../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

Wazuh server worker nodes
~~~~~~~~~~~~~~~~~~~~~~~~~


#. .. include:: ../../../../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst


#. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, enable and start the Wazuh manager service:

    .. include:: ../../../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. .. include:: ../../../../../_templates/installations/wazuh/common/check_wazuh_cluster.rst


.. _basic_wazuh_server_multi_node_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.  It has to be installed in every Wazuh manager server.


Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../../../_templates/installations/elastic/yum/install_filebeat.rst



      .. group-tab:: APT


        .. include:: ../../../../../_templates/installations/elastic/deb/install_filebeat.rst



      .. group-tab:: ZYpp


        .. include:: ../../../../../_templates/installations/elastic/zypp/install_filebeat.rst



#. Download the pre-configured Filebeat configuration file used to forward the Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/filebeat/7.x/filebeat_elastic_cluster.yml

#. Download the alerts template for Elasticsearch:

    .. include:: ../../../../../_templates/installations/elastic/common/load_filebeat_template.rst


#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml``:

    .. include:: ../../../../../_templates/installations/elastic/common/configure_filebeat.rst

#. Configure Filebeat certificates:

    .. include:: ../../../../../_templates/installations/elastic/common/copy_certificates_filebeat_wazuh_cluster.rst

#. Enable and start the Filebeat service:

    .. include:: ../../../../../_templates/installations/elastic/common/enable_filebeat.rst

To ensure that Filebeat has been successfully installed, run the following command:

    .. code-block:: console

      # filebeat test output

An example response should look as follows:

.. code-block:: none
             :class: output

              elasticsearch: https://127.0.0.1:9200...
                parse url... OK
                connection...
                  parse host... OK
                  dns lookup... OK
                  addresses: 127.0.0.1
                  dial up... OK
                TLS...
                  security: server's certificate chain verification is enabled
                  handshake... OK
                  TLS version: TLSv1.3
                  dial up... OK
                talk to server... OK
                version: 7.8.0

Next steps
----------

The next step consists of :ref:`installing Kibana <kibana>`.
