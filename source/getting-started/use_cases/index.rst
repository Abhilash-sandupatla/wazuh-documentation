.. Copyright (C) 2019 Wazuh, Inc.

.. _use_cases:

Use cases
=========

The Wazuh platform is used to protect and monitor systems in different ways. Because of all of its capabilities, it is often used for threat prevention, detection, and response. Besides, the Wazuh platform is used to meet regulatory compliance requirements (such PCI DSS or HIPAA) and configuration standards (CIS hardening guides).

Wazuh is a popular security solution among IaaS users (eg. Amazon AWS, Azure, or Google cloud), used to monitor virtual machines and cloud instances. This is done at a system level utilizing the :ref:`Wazuh security agent <wazuh_agent>`, and at an infrastructure level pulling data directly from the cloud provider API.

Additionally, Wazuh is often used to protect containerized environments providing cloud-native runtime security. This feature is based on an integration with the Docker engine API and Kubernetes API. Besides, for better protection, Wazuh security agent can run on the Docker host providing a complete set of threat detection and response capabilities.

In this section of the documentation you will find a brief example of some of the more common use cases of the Wazuh solution.

.. list-table::
   :width: 100%
   :widths: 50 50

   * - :ref:`Log data analysis <log_analysis>`
     - :ref:`File integrity monitoring <file_integrity>`
   * - :ref:`Rootkits detection <rootkits_detection>`
     - :ref:`Active response <active_response>`
   * - :ref:`Configuration assessment <configuration_assessment>`
     - :ref:`System inventory <system_inventory>`
   * - :ref:`Vulnerability detection <vulnerability_detection>`
     - :ref:`Cloud security monitoring <cloud_security>`
   * - :ref:`Containers security monitoring <containers_security>`
     - :ref:`Regulatory compliance <regulatory_compliance>`

.. toctree::
   :hidden:
   :maxdepth: 1

   log_analysis
   file_integrity
   rootkits_detection
   active_response
   configuration_assessment
   system_inventory
   vulnerability_detection
   cloud_security
   containers_security
   regulatory_compliance
