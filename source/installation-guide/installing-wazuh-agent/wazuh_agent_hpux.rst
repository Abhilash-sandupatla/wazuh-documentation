.. _wazuh_agent_hpux:

Install Wazuh agent on HP-UX
============================

The Wazuh agent for HP-UX can be downloaded from our :doc:`packages list<../packages-list/index>`. The installation steps are:

Create the user and the group OSSEC:

.. code-block:: bash

    useradd ossec
    groupadd ossec

Unzip the package in ``/``:

.. code-block:: bash

    tar -xvf wazuh-agent-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar -C /

.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the user manual.
