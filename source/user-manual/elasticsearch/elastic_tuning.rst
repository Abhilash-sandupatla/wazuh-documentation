.. Copyright (C) 2021 Wazuh, Inc.

.. _elastic_tuning:

Elasticsearch tuning
====================

This guide summarizes the relevant configurations that allow for the optimization of Elasticsearch.

- `Change users' password`_
- `Memory locking`_
- `Shards and replicas`_

.. _change_elastic_pass:

Change users' password
----------------------

In order to improve security, it is highly recommended to change Elasticsearch's default passwords.

.. tabs::

  .. group-tab:: Open Distro for Elasticsearch

    The following script allows changing the password for a given user. In this example it is used the user ``admin``:

    - Download the script:
    
      .. code-block:: console
      
        # curl -so wazuh-passwords-tool.sh curl -so ~/passwords.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/3426-Password_change_tool/resources/open-distro/tools/wazuh-passwords-tool.sh

    - Run the script:

      .. code-block:: console
      
        # bash wazuh-passwords-tool.sh -u admin -p mypassword

    This is the output of the script:

      .. code-block:: none
        :class: output 

        Creating backup...
        Backup created
        Generating hash
        Hash generated
        Loading changes...
        Done
        Password changed. Remember to update the password in /etc/filebeat/filebeat.yml and /etc/kibana/kibana.yml if necessary and restart the services.


    The script allows changing the password for either a single user or all the users present on the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. All the available options to run the script are:

    +-----------------------------+------------------------------------------------------------------------------------------------------------------------------+
    | Options                     | Purpose                                                                                                                      |
    +=============================+==============================================================================================================================+
    | -a / --change-all           | Generates random passwords, changes all the Open Distro user passwords and prints them on screen                             |
    +-----------------------------+------------------------------------------------------------------------------------------------------------------------------+
    | -p / --password <password>  | Indicates the new password, must be used with option ``-u``                                                                  |
    +-----------------------------+------------------------------------------------------------------------------------------------------------------------------+    
    | -u / --user <user>          | Indicates the name of the user whose password will be changed. If no password specified it will generate a random one        |
    +-----------------------------+------------------------------------------------------------------------------------------------------------------------------+
    | -v / --verbose              | Shows the complete script execution output                                                                                   |
    +-----------------------------+------------------------------------------------------------------------------------------------------------------------------+
    | -h / --help                 | Shows help                                                                                                                   |
    +-----------------------------+------------------------------------------------------------------------------------------------------------------------------+

    To generate and change passwords for all users, run the script with the ``-a`` option:

    - Run the script:

      .. code-block:: console
      
        # bash wazuh-passwords-tool.sh -a

    This is the output of the script:

      .. code-block:: none
        :class: output 

        Generating random passwords
        Done
        Creating backup...
        Backup created
        Generating hashes
        Hashes generated
        Loading changes...
        Done

        The password for admin is Re6dEMVUcB_c6rEDf_C_nkBCZkwFKtZL

        The password for kibanaserver is 4KLxLHor69cq2i1jFXmSUjBTVjG2yhU9

        The password for kibanaro is zCd-SrihVwzfRxj5qPrwlSgmZJP9RsMA

        The password for logstash is OmbPImuV5fv11R6XYAG92cUjaDy9PkdH

        The password for readall is F2vglVGFJHXohwqEW5G4Tfjsiz-qqkTU

        The password for snapshotrestore is rd35bCchP3Uf-0w77VCEJzHF7WEP3fNw

        Passwords changed. Renember to update the password in /etc/filebeat/filebeat.yml and /etc/kibana/kibana.yml if necessary and restart the services.
  

    .. note:: The password may need to be updated in both ``/etc/filebeat/filebeat.yml`` and ``/etc/kibana/kibana.yml``. After changing the configuration files, remember to restart the corresponding services.

  

  .. group-tab:: Elastic Stack basic license

    During the installation of Elasticsearch, the passwords for the different users were automatically generated. These passwords can be changed afterwards using API requests. Replace the following variables and execute the corresponding API call: 

      - ``<elasticsearch_ip>``: The IP of the Elasticsearch node.
      - ``<username>``: The name of the user whose password is going to be changed.
      - ``<user_password>``: Current user's password. 
      - ``<new_password>``: The new password that will be assigned to the ``<username>`` user.

    .. code-block:: console
 
      # curl -k -X POST -u <username>:<user_password> "https://<elasticsearch_ip>:9200/_security/user/<username>/_password?pretty" -H 'Content-Type: application/json' -d '
      # {
      #   "password" : "<new_password>"
      # }
      # '

    If the call was successful it returns an empty JSON structure ``{ }``.  
    
    .. note:: The password may need to be updated in ``/etc/filebeat/filebeat.yml`` and ``/etc/kibana/kibana.yml``. 
    
  



Memory locking
--------------

Elasticsearch performs poorly when the system is swapping the memory. It is vitally important to the health of the node that none of the JVM is ever swapped out to disk. The following steps show how to set the ``bootstrap.memory_lock`` setting to true so Elasticsearch will lock the process address space into RAM. This prevents any Elasticsearch memory from being swapped out.

#. Set ``bootstrap.memory_lock``:

    Uncomment or add this line to the ``/etc/elasticsearch/elasticsearch.yml`` file:

    .. code-block:: yaml

      bootstrap.memory_lock: true

#. Edit the limit of system resources:

    Where to configure systems settings depends on which package and operating system used for the Elasticsearch installation.

    .. tabs::

        .. group-tab:: Systemd

          In a case where **systemd** is used, system limits need to be specified via systemd. To do this, create the folder executing the command:

          .. code-block:: console

            # mkdir -p /etc/systemd/system/elasticsearch.service.d/

          Then, in the new directory, add a file called ``elasticsearch.conf`` and specify any changes in that file:

          .. code-block:: console

            # cat > /etc/systemd/system/elasticsearch.service.d/elasticsearch.conf << EOF
            [Service]
            LimitMEMLOCK=infinity
            EOF            

        .. group-tab:: SysV Init

          Edit the proper file ``/etc/sysconfig/elasticsearch`` for RPM or ``/etc/default/elasticsearch`` for Debian:

          .. code-block:: bash

            MAX_LOCKED_MEMORY=unlimited

#. Limit memory:

    The previous configuration might cause node instability or even node death with an ``OutOfMemory`` exception if Elasticsearch tries to allocate more memory than is available. JVM heap limits will help limit memory usage and prevent this situation. There are two rules to apply when setting the Elasticsearch heap size:

      - Use no more than 50% of available RAM.
      - Use no more than 32 GB.

    In addition, it is important to take into account the memory usage of the operating system, services, and software that are running on the host. By default, Elasticsearch is configured with a 1 GB heap. It can be changed via JVM flags using the ``/etc/elasticsearch/jvm.options`` file:

    .. code-block:: yaml

      # Xms represents the initial size of total heap space
      # Xmx represents the maximum size of total heap space

      -Xms4g
      -Xmx4g

    .. warning::

      The values min ``(Xms)`` and max ``(Xmx)`` sizes must be the same to prevent JVM heap resizing at runtime as this is a very costly process.

#. Restart Elasticsearch:

.. tabs::


    .. group-tab:: Systemd Systemd


      .. code-block:: console

        # systemctl daemon-reload
        # systemctl restart elasticsearch



    .. group-tab:: Systemd SysV Init


      .. code-block:: console

        # service elasticsearch restart

After starting Elasticsearch, run the following request to verify that the setting was successfully changed by checking the value of ``mlockall``:

.. code-block:: console

    # curl "http://localhost:9200/_nodes?filter_path=**.mlockall&pretty"

.. code-block:: json
    :class: output

    {
      "nodes" : {
        "sRuGbIQRRfC54wzwIHjJWQ" : {
          "process" : {
            "mlockall" : true
          }
        }
      }
    }

If the output of the ``"mlockall"`` field is **false**, the request failed.  In addition, the following line will appear in ``/var/log/elasticsearch/elasticsearch.log``:

.. code-block:: none
  :class: output

  Unable to lock JVM Memory

Reference:

  - `Memory lock check <https://www.elastic.co/guide/en/elasticsearch/reference/current/_memory_lock_check.html>`_.
  - `bootstrap.memory_lock <https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html#bootstrap.memory_lock>`_.
  - `Enable bootstrap.memory_lock <https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-configuration-memory.html#mlockall>`_.
  - `Heap: Sizing and Swapping <https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html>`_.
  - `Limiting memory usage <https://www.elastic.co/guide/en/elasticsearch/guide/current/_limiting_memory_usage.html#_limiting_memory_usage>`_.

Shards and replicas
-------------------

Elasticsearch provides the ability to split an index into multiple segments called shards. Each shard is, in and of itself, a fully-functional and independent "index" that can be hosted on any node in the cluster. Sharding is important for two primary reasons:

- Horizontally scalation.

- Distribute and parallelize operations across shards, increasing the performance and throughput.

Also, Elasticsearch allows making one or more copies of the index’s shards into what are called replica shards, or replicas for short. Replication is important for two primary reasons:

- Provides high availability in case a shard or node failure.

- Allows to scale out the search volume and throughput since searches can be executed on all replicas in parallel.

.. warning::

  The number of shards and replicas can be defined per index at the time the index is created. After the index is created, the number of *replicas* will have to be changed dynamically, however, the number of *shards* after-the-fact cannot be changed.

How many shards should an index have?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As it is not possible to *reshard* (changing the number of shards) without reindexing, careful consideration should be given to how many shards will be needed *before* the first index is created. The number of nodes that will be on the installation will influence how many shards should be planned. In general, the most optimal performance will be realized by using the same number of shards as nodes are. So, a cluster with three nodes should have three shards, while a cluster with one node would only need one shard.

How many replicas should an index have?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Here is an example of how a cluster with three nodes and three shards could be set up:

- **No replica:** Each node has one shard. If a node goes down, we will be left with an incomplete index of two shards.

- **One replica:** Each node has one shard and one replica. If a node goes down, there will still be a complete index.

- **Two replicas:** Each node has one shard and two replicas (the full index). With this setup, the cluster can still function even if two nodes go down. This appears to be the best solution, however, it increases the storage requirements.

Setting the number of shards and replicas
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The default installation of :ref:`Elasticsearch <installation_guide>` will configure each index with 3 primary shards and no replicas.

To change these settings, the Elasticsearch's template will have to be edited. In the following example, the proper values for shards and replicas are configured in a cluster with only one node.

.. warning::

  If the index has already been created, it must be `reindexed <https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html>`_ after editing the template.

#. Download the Wazuh Elasticsearch template:

    .. code-block:: console

      # curl https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json -o w-elastic-template.json

#. Edit the template ``w-elastic-template.json`` in order to set one shard with no replicas:

    .. code-block:: json
      :class: output

      {
        "order": 1,
        "index_patterns": ["wazuh-alerts-4.x-*"],
        "settings": {
          "index.refresh_interval": "5s",
          "index.number_of_shards": "3",
          "index.number_of_replicas": "0",
          "index.auto_expand_replicas": "0-1",
          "index.mapping.total_fields.limit": 2000
        },
        "mappings": {
        "...": "..."
        }
      }

    .. warning::

      The value "order" is set to "1", otherwise Filebeat will overwrite the existing template. Multiple matching templates with the same order value will result in a non-deterministic merging order.

#. Load the template:

    .. code-block:: console

      # curl -X PUT "http://localhost:9200/_template/wazuh-custom" -H 'Content-Type: application/json' -d @w-elastic-template.json

    .. code-block:: json
      :class: output

      { "acknowledged" : true }

#. *Optional*. Confirm that the configuration was updated successfully:

    .. code-block:: console

      # curl "https://localhost:9200/_template/wazuh-custom?pretty&filter_path=wazuh-custom.settings" -k -u admin:admin

    In case of having changed the admin's user credentials, the ``admin:admin`` must be modified in consequence.

    .. code-block:: json
      :class: output

      {
        "wazuh-custom" : {
          "settings" : {
            "index" : {
              "mapping" : {
                "total_fields" : {
                  "limit" : "2000"
                }
              },
              "refresh_interval" : "5s",
              "number_of_shards" : "3",
              "auto_expand_replicas" : "0-1",
              "number_of_replicas" : "1"
            }
          }
        }
      }


Changing the number of replicas
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The number of replicas can be changed dynamically using the Elasticsearch API. In a cluster with one node, the number of replicas should be set to zero:

.. code-block:: none

  # curl -X PUT "http://localhost:9200/wazuh-alerts-\*/_settings?pretty" -H 'Content-Type: application/json' -d'
  {
    "settings" : {
      "number_of_replicas" : 0
    }
  }'

More information about configuring and shards and replicas can be found in the :ref:`Kibana configuration section <kibana_config_file>`.

Reference:

  - `Shards & Replicas <https://www.elastic.co/guide/en/elasticsearch/reference/6.x/getting-started-concepts.html#getting-started-shards-and-replicas>`_.
