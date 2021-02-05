.. Copyright (C) 2021 Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.0/resources/open-distro/kibana/7.x/kibana_all_in_one.yml

In the ``/etc/kibana/kibana.yml`` file, the setting  ``server.host`` has the value ``0.0.0.0``.  It means that Kibana can be accessed from the outside and will accept all the available IPs of the host. This value can be changed for a specific IP if needed. 

.. End of configure_kibana.rst
