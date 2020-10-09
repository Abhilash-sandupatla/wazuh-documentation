.. Copyright (C) 2020 Wazuh, Inc.

.. _unattended_distributed_index:

Unattended installation
=======================

The unattended installation method consists of two scripts that will automatize the installation of all the components involved for both, the Wazuh cluster and the Elasticsearch cluster. The following components will be installed:

- **Elasticsearch cluster:** the script will install Open Distro for Elasticsearch. It can be chosen between a single-node or a multi-node installation. Additionally, the script given can install Open Distro for Kibana either on the same Elasticsearch node or on a different one. The installation of Open Distro for Kibana also includes the installation of the Wazuh Kibana plugin.

- **Wazuh cluster:** the script will install the Wazuh manager, the Wazuh API and Filebeat on its OSS version.

It is highly recommended to first install Open Distro for Elasticsearch, since the certificates needed for securing the communication are created during its installation. 

.. toctree::
    :maxdepth: 1

    unattended-elasticsearch-cluster-installation
    unattended-wazuh-cluster-installation
