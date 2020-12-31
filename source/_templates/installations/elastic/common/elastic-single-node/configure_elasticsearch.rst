.. Copyright (C) 2020 Wazuh, Inc.

Once Elasticsearch is installed, download the pre-configured configuration file:

.. code-block:: console

  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3074_installation_guide_new_structure/resources/open-distro/elasticsearch/7.x/elasticsearch.yml

This file configures Elasticsearch to use ``0.0.0.0`` for the ``network.host`` variable, so it will accept communications directed to any of its IP addresses instead of binding to the IP of a specific network interface in the host. Access may be restricted to a specific network interface by specifying its IP in this setting so Elasticsearch may not be unnecessarily exposed. 

.. End of include file
