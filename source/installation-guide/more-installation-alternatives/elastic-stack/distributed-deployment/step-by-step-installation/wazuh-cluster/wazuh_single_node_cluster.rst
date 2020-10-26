.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _basic_wazuh_single_node_cluster:


Wazuh single-node cluster
=========================

This document will go through the installation of the Wazuh server components in a single-node cluster.

Alternatively, if you wish to do this installation in a automated way, you can find the instructions :ref:`here <basic_unattended_distributed_wazuh>`.

.. note:: Root user privileges are required to execute all the commands described below.

Prerequisites
-------------

Before installing the Wazuh manager and Filebeat, some extra packages must be installed:

.. include:: ../../../../../../_templates/installations/basic/before_installation_elastic.rst

Installing Wazuh server
-----------------------

The Wazuh server collects and analyzes data from deployed agents. It runs the Wazuh manager and Filebeat. The first step to set up Wazuh is adding Wazuh's repository to the server. Alternatively, the Wazuh manager package can be downloaded directly and compatible versions can be checked :ref:`here <packages>`.

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../../_templates/installations/basic/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../../../_templates/installations/basic/wazuh/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../../_templates/installations/basic/wazuh/zypp/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Wazuh manager package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../../../../_templates/installations/basic/wazuh/yum/install_wazuh_manager.rst



      .. group-tab:: APT


        .. include:: ../../../../../../_templates/installations/basic/wazuh/deb/install_wazuh_manager.rst



      .. group-tab:: ZYpp


        .. include:: ../../../../../../_templates/installations/basic/wazuh/zypp/install_wazuh_manager.rst


#. Enable and start the Wazuh manager service:


    .. include:: ../../../../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst


#. Run the following command to check if the Wazuh manager is active: 

    .. include:: ../../../../../../_templates/installations/wazuh/common/check_wazuh_manager.rst    


.. _basic_wazuh_server_single_node_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.

Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../../_templates/installations/basic/elastic/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../../../_templates/installations/basic/elastic/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../../_templates/installations/basic/elastic/zypp/add_repository.rst


Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../../../../_templates/installations/basic/elastic/yum/install_filebeat.rst



      .. group-tab:: APT


        .. include:: ../../../../../../_templates/installations/basic/elastic/deb/install_filebeat.rst



      .. group-tab:: ZYpp


        .. include:: ../../../../../../_templates/installations/basic/elastic/zypp/install_filebeat.rst


#. Download the pre-configured Filebeat config file used to forward Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.0/resources/elastic-stack/filebeat/7.x/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/4.0/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml``:

    .. include:: ../../../../../../_templates/installations/basic/elastic/common/configure_filebeat.rst


#. Configure Filebeat certificate:

    .. include:: ../../../../../../_templates/installations/basic/elastic/common/copy_certificates_filebeat.rst

#. Enable and start the Filebeat service:

    .. include:: ../../../../../../_templates/installations/basic/elastic/common/enable_filebeat.rst

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

The next step consists of installing Kibana. The guide continues  :ref:`here<basic_kibana>`.


Disabling repositories
----------------------

.. include:: ../../../../../../_templates/installations/basic/elastic/common/disabling_repositories_explanation.rst


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../../_templates/installations/basic/wazuh/yum/disabling_repositories.rst



  .. group-tab:: APT


    .. include:: ../../../../../../_templates/installations/basic/wazuh/deb/disabling_repositories.rst



  .. group-tab:: ZYpp

    .. include:: ../../../../../../_templates/installations/basic/wazuh/zypp/disabling_repositories.rst


To uninstall Wazuh and Filebeat, visit the :ref:`uninstalling section <user_manual_uninstall_wazuh_installation_basic>`.

Next steps
----------

The next step consists of :ref:`installing Kibana <basic_kibana>`.
