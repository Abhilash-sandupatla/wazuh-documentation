.. Copyright (C) 2021 Wazuh, Inc.

.. _api:

RESTful API
===========

The Wazuh API is an open source RESTful API that allows interaction with the Wazuh manager from a web browser, a command line tool such as cURL or any script or program able to make web requests. The Wazuh UI relies on the Wazuh API and the ultimate goal of Wazuh is to accommodate complete remote management of its infrastructure via the Wazuh UI. Use the Wazuh API to easily perform everyday actions such as adding an agent, restarting the manager(s) or agent(s), or looking up syscheck details.

Here is a list of the Wazuh API capabilities:

* Agent management
* Manager control and overview
* Cluster control and overview
* Syscheck control and search
* MITRE attacks and CISCAT overview
* Ruleset information
* Syscollector information
* Access restriction and security (RBAC)
* API management (HTTPS, configuration)
* Users management
* Statistical information
* Error handling
* Query remote configuration

For more details, check out the :ref:`Use Cases <wazuh_api_use_cases>`.


.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       getting-started
       configuration
       securing_api
       equivalence
       rbac/index
       queries
       examples
       reference
