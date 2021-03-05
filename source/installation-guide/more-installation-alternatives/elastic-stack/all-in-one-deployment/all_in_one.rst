.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh and Elastic Stack on a single host

.. _basic_all_in_one:

Step-by-step installation
=========================
This document guides through an installation of the Wazuh server and Elastic stack components in an all-in-one configuration. This guide provides instructions to configure the official repositories to do the installations, alternatively, all the available packages can be found :ref:`here <packages>`. 

.. note:: Root user privileges are required to execute all the commands described below.

Prerequisites
-------------
Some extra packages are needed for the installation, such us ``curl`` or ``unzip``, that will be used in further steps: 

.. include:: ../../../../_templates/installations/basic/before_installation_all_in_one.rst

.. _basic_all_in_one_elastic:

Installing Elasticsearch
------------------------

Elasticsearch is a highly scalable full-text search and analytics engine.  


Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

  .. group-tab:: Yum


    .. include:: ../../../../_templates/installations/basic/elastic/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../_templates/installations/basic/elastic/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../_templates/installations/basic/elastic/zypp/add_repository.rst



Elasticsearch installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Elasticsearch package:

    .. tabs::

      .. group-tab:: Yum


        .. include:: ../../../../_templates/installations/basic/elastic/yum/install_elasticsearch.rst



      .. group-tab:: APT


        .. include:: ../../../../_templates/installations/basic/elastic/deb/install_elasticsearch.rst



      .. group-tab:: ZYpp


        .. include:: ../../../../_templates/installations/basic/elastic/zypp/install_elasticsearch.rst


#. .. include:: ../../../../_templates/installations/basic/elastic/common/elastic-single-node/configure_elasticsearch_aio.rst


Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Download the configuration file for creating the certificates:

    .. code-block:: console

        # curl -so /usr/share/elasticsearch/instances.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/|WAZUH_LATEST_MINOR|/resources/elastic-stack/instances_aio.yml
    
    
    In the following steps, a file that contains a folder named after the instance defined here will be created. This folder will contain the certificates and the keys necessary to communicate with the Elasticsearch node using SSL.

#. The certificates can be created using the elasticsearch-certutil tool:

    .. code-block:: console

        # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip

#. Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. 

    .. code-block:: console

        # unzip ~/certs.zip -d ~/certs

#. The next step is to create the directory ``/etc/elasticsearch/certs``, and then copy the CA file, the certificate and the key there:

    .. code-block:: console

        # mkdir /etc/elasticsearch/certs/ca -p
        # cp -R ~/certs/ca/ ~/certs/elasticsearch/* /etc/elasticsearch/certs/
        # chown -R elasticsearch: /etc/elasticsearch/certs
        # chmod -R 500 /etc/elasticsearch/certs
        # chmod 400 /etc/elasticsearch/certs/ca/ca.* /etc/elasticsearch/certs/elasticsearch.*
        # rm -rf ~/certs/ ~/certs.zip
   
#. Enable and start the Elasticsearch service:

    .. include:: ../../../../_templates/installations/basic/elastic/common/enable_elasticsearch.rst

#. Generate credentials for all the Elastic Stack pre-built roles and users:

    .. include:: ../../../../_templates/installations/basic/elastic/common/generate_elastic_credentials.rst

To check that the installation was made successfully, run the following command replacing ``<elastic_password>`` by the password generated on the previous step for ``elastic`` user:

.. code-block:: console
  
  # curl -XGET https://localhost:9200 -uelastic:<elastic_password> -k

This command should have an output like this:

.. code-block:: console
  :class: output

  {
    "name" : "elasticsearch",
    "cluster_name" : "elasticsearch",
    "cluster_uuid" : "LTTJx4wGTmONK4pkD0IclA",
    "version" : {
    "number" : "7.10.0",
      "build_flavor" : "default",
      "build_type" : "rpm",
      "build_hash" : "51e9d6f22758d0374a0f3f5c6e8f3a7997850f96",
      "build_date" : "2020-11-09T21:30:33.964949Z",
      "build_snapshot" : false,
      "lucene_version" : "8.7.0",
      "minimum_wire_compatibility_version" : "6.8.0",
      "minimum_index_compatibility_version" : "6.0.0-beta1"
    },
    "tagline" : "You Know, for Search"
  }



.. _basic_all_in_one_wazuh:

Installing Wazuh server
-----------------------

The Wazuh server collects and analyzes data from deployed agents. It runs the Wazuh manager, the Wazuh API and Filebeat. The first step to set up Wazuh is to add the Wazuh repository to the server. Alternatively, the Wazuh manager package can be downloaded directly and compatible versions can be checked :ref:`here <packages>`.

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::



  .. group-tab:: Yum


    .. include:: ../../../../_templates/installations/basic/wazuh/yum/add_repository_aio.rst



  .. group-tab:: APT


    .. include:: ../../../../_templates/installations/basic/wazuh/deb/add_repository_aio.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../_templates/installations/basic/wazuh/zypp/add_repository_aio.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Wazuh manager package:

    .. tabs::

      .. group-tab:: Yum


        .. include:: ../../../../_templates/installations/basic/wazuh/yum/install_wazuh_manager.rst



      .. group-tab:: APT


        .. include:: ../../../../_templates/installations/basic/wazuh/deb/install_wazuh_manager.rst



      .. group-tab:: ZYpp


        .. include:: ../../../../_templates/installations/basic/wazuh/zypp/install_wazuh_manager.rst


#. Enable and start the Wazuh manager service:

    .. include:: ../../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to check if the Wazuh manager is active: 

    .. include:: ../../../../_templates/installations/wazuh/common/check_wazuh_manager.rst    

.. _basic_wazuh_server_packages_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.


Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../../_templates/installations/basic/elastic/yum/install_filebeat.rst    



      .. group-tab:: APT


        .. include:: ../../../../_templates/installations/basic/elastic/deb/install_filebeat.rst



      .. group-tab:: ZYpp


        .. include:: ../../../../_templates/installations/basic/elastic/zypp/install_filebeat.rst


#. Download the pre-configured Filebeat config file used to forward Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/|WAZUH_LATEST_MINOR|/resources/elastic-stack/filebeat/7.x/filebeat_all_in_one.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/|WAZUH_LATEST_MINOR|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml``:

    .. include:: ../../../../_templates/installations/basic/elastic/common/configure_filebeat_aio.rst


#. Copy the certificates into ``/etc/filebeat/certs/``

    .. code-block:: console

      # cp -r /etc/elasticsearch/certs/ca/ /etc/filebeat/certs/
      # cp /etc/elasticsearch/certs/elasticsearch.crt /etc/filebeat/certs/filebeat.crt
      # cp /etc/elasticsearch/certs/elasticsearch.key /etc/filebeat/certs/filebeat.key
      

#. Enable and start the Filebeat service:

    .. include:: ../../../../_templates/installations/basic/elastic/common/enable_filebeat.rst

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
    version: 7.10.0
   


Kibana installation and configuration
-------------------------------------
Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch.

#. Install the Kibana package:

    .. tabs::

        .. group-tab:: Yum


            .. include:: ../../../../_templates/installations/basic/elastic/yum/install_kibana.rst    



        .. group-tab:: APT


            .. include:: ../../../../_templates/installations/basic/elastic/deb/install_kibana.rst



        .. group-tab:: ZYpp


            .. include:: ../../../../_templates/installations/basic/elastic/zypp/install_kibana.rst


#. Copy the Elasticsearch certificates into the Kibana configuration folder:

    .. include:: ../../../../_templates/installations/basic/elastic/common/copy_certificates_kibana_elastic_server.rst

#. Download the Kibana configuration file:

    .. include:: ../../../../_templates/installations/basic/elastic/common/configure_kibana_all_in_one.rst

#. Create the ``/usr/share/kibana/data`` directory:

    .. code-block:: console
    
      # mkdir /usr/share/kibana/data
      # chown -R kibana:kibana /usr/share/kibana

#. Install the Wazuh Kibana plugin. The installation of the plugin must be done from the Kibana home directory as follows:

    .. code-block:: console

        # cd /usr/share/kibana
        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-4.1.2_7.10.2-1.zip

#. Link Kibana's socket to privileged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Enable and start the Kibana service:

    .. include:: ../../../../_templates/installations/basic/elastic/common/enable_kibana.rst


#. Access the web interface using the password generated during the Elasticsearch installation process: 

  .. code-block:: none

      URL: https://<wazuh_server_ip>
      user: elastic
      password: <PASSWORD_elastic>


 Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``ca.crt`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured. 


Disabling repositories
----------------------

.. include:: ../../../../_templates/installations/basic/elastic/common/disabling_repositories_explanation.rst


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../_templates/installations/basic/wazuh/yum/disabling_repositories.rst



  .. group-tab:: APT


    .. include:: ../../../../_templates/installations/basic/wazuh/deb/disabling_repositories.rst



  .. group-tab:: ZYpp

    .. include:: ../../../../_templates/installations/basic/wazuh/zypp/disabling_repositories.rst


To uninstall all the components of the all in one installation, visit the :ref:`uninstalling section <user_manual_uninstall_wazuh_installation_basic>`.

Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh agent installation guide is available for most operating systems and can be found :ref:`here<installation_agents>`.
