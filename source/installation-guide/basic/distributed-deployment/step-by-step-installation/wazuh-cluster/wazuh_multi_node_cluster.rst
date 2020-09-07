.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _basic_wazuh_multi_node_cluster:


Wazuh multi-node cluster
=========================

This document will go through the installation of the Wazuh server components in a multi-node cluster.

.. note:: Root user privileges are required to execute all the commands described below.

Prerequisites
-------------

Before installing the Wazuh servers and Filebeat, some extra packages must be installed:

.. include:: ../../../../../_templates/installations/basic/before_installation_elastic.rst

Installing Wazuh server
-----------------------

The Wazuh server collects and analyzes data from deployed agents. It runs the Wazuh manager, the Wazuh API and Filebeat. The first step to set up Wazuh is adding Wazuh's repository to the servers. Alternatively, the Wazuh manager package can be downloaded directly and compatible versions can be checked :ref:`here <packages>`.

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section describes how to add the Wazuh repository. It will be used for Wazuh manager and Wazuh API installation. These steps must be followed in all the servers that will be part of the Wazuh multi-node cluster.

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/basic/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/basic/wazuh/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/basic/wazuh/zypp/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Wazuh manager package. This step must be applied in all servers that will act as a Wazuh cluster nodes:

.. tabs::


  .. group-tab:: Ym


    .. include:: ../../../../../_templates/installations/basic/wazuh/yum/install_wazuh_manager.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/basic/wazuh/deb/install_wazuh_manager.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/basic/wazuh/zypp/install_wazuh_manager.rst


Now, the Wazuh manager has been installed in all the Wazuh cluster nodes. The Wazuh manager is installed and configured in a single-node cluster by default. The following sections will describe how to configure the Wazuh manager as a Wazuh master node or Wazuh worker node.

One server has to be chosen as a master, the rest will be workers. So, the section ``Wazuh server master node`` must be applied once, in the server chosen for this role. For all the other servers, the section ``Wazuh server worker node`` must be applied.


Wazuh server master node
~~~~~~~~~~~~~~~~~~~~~~~~

#. .. include:: ../../../../../_templates/installations/basic/wazuh/common/configure_wazuh_master_node.rst


#. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, enable and start the Wazuh manager service:

    .. include:: ../../../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst


Wazuh server worker nodes
~~~~~~~~~~~~~~~~~~~~~~~~~


#. .. include:: ../../../../../_templates/installations/basic/wazuh/common/configure_wazuh_worker_node.rst


#. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, enable and start the Wazuh manager service:

    .. include:: ../../../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst


#. .. include:: ../../../../../_templates/installations/basic/wazuh/common/check_wazuh_cluster.rst


.. _wazuh_server_multi_node_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch. It has to be installed in every Wazuh manager server.

Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/basic/elastic/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/basic/elastic/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/basic/elastic/zypp/add_repository.rst


Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../../../_templates/installations/basic/elastic/yum/install_filebeat.rst



      .. group-tab:: APT


        .. include:: ../../../../../_templates/installations/basic/elastic/deb/install_filebeat.rst



      .. group-tab:: ZYpp


        .. include:: ../../../../../_templates/installations/basic/elastic/zypp/install_filebeat.rst


#. Download the pre-configured Filebeat config file used to forward Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/elastic-stack/filebeat/7.x/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v3.13.1/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Configure Filebeat certificates:

    .. include:: ../../../../../_templates/installations/basic/elastic/common/copy_certificates_filebeat_wazuh_cluster.rst

#. Edit ``/etc/filebeat/filebeat.yml`` file:

    .. include:: ../../../../../_templates/installations/basic/elastic/common/configure_filebeat.rst


#. Enable and start the Filebeat service:

    .. include:: ../../../../../_templates/installations/basic/elastic/common/enable_filebeat.rst


Next steps
----------

The next step consists of installing Kibana. The guide continues  :ref:`here<basic_kibana>`.


Disabling repositories
----------------------

.. include:: ../../../../../_templates/installations/basic/elastic/common/disabling_repositories_explanation.rst


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/basic/wazuh/yum/disabling_repositories.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/basic/wazuh/deb/disabling_repositories.rst



  .. group-tab:: ZYpp

    .. include:: ../../../../../_templates/installations/basic/wazuh/zypp/disabling_repositories.rst
