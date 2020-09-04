.. Copyright (C) 2020 Wazuh, Inc.

During the Elasticsearch installation, the ``certs.tar`` file was created.This guide assumes that a copy of this file has been placed in the root home folder (``~/``).

The ``X`` must be replaced with the number used in the certificate name defined for this Wazuh server:

.. code-block:: console

  # mkdir /etc/filebeat/certs
  # mv ~/certs.tar /etc/filebeat/certs/
  # cd /etc/filebeat/certs/
  # tar -xf certs.tar filebeat-X.pem filebeat-X.key root-ca.pem
  # mv /etc/filebeat/certs/filebeat-X.pem /etc/filebeat/certs/filebeat.pem
  # mv /etc/filebeat/certs/filebeat-X.key /etc/filebeat/certs/filebeat.key

.. End of copy_certificates_filebeat_wazuh_cluster.rst
