.. Copyright (C) 2020 Wazuh, Inc.

Configure the cluster node by editing the following settings in the ``/var/ossec/etc/ossec.conf`` file:

.. code-block:: xml

  <cluster>
      <name>wazuh</name>
      <node_name>worker-node</node_name>
      <node_type>worker</node_type>
      <key>c98b62a9b6169ac5f67dae55ae4a9088</key>      
      <port>1516</port>
      <bind_addr>0.0.0.0</bind_addr>
      <nodes>
          <node>wazuh-master-address</node>
      </nodes>
      <hidden>no</hidden>
      <disabled>no</disabled>
  </cluster>

As shown in the example above, the following parameters have to be edited:

+-------------------------------------+----------------------------------------------------------------------------------------------+
| :ref:`node_name <cluster_node_name>`| Each node of the cluster must have a unique name.                                            |
+-------------------------------------+----------------------------------------------------------------------------------------------+
| :ref:`node_type <cluster_node_type>`| Has to be set as ``worker``.                                                                 |
+-------------------------------------+----------------------------------------------------------------------------------------------+
| :ref:`key <cluster_key>`            | The key created previously for the ``master`` node. It has to be the same for all the nodes. |
+-------------------------------------+----------------------------------------------------------------------------------------------+
| :ref:`nodes <cluster_nodes>`        | Has to contain the address of the master (it can be either an IP or a DNS).                  |
+-------------------------------------+----------------------------------------------------------------------------------------------+
| :ref:`disabled <cluster_disabled>`  | Has to be set to ``no``.                                                                     |
+-------------------------------------+----------------------------------------------------------------------------------------------+

.. End of include file
