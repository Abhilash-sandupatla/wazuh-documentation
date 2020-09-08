.. _wazuh_agent_aix:

Install Wazuh agent on AIX
==============================

The Wazuh agent for AIX can be downloaded from our :doc:`packages list<../packages-list/index>`. The installation steps are:

Create user and group OSSEC:

.. code-block:: console

    # mkgroup ossec
    # useradd -G ossec ossec

Unzip the package in ``/``:

* Installing in AIX 5.3

.. code-block:: console

    # tar -xvf wazuh-agent_v|WAZUH_LATEST|-aix5.3.tar.gz -C /


* Installing in AIX 7

.. code-block:: console

    # tar -xvf wazuh-agent_v|WAZUH_LATEST|-aix7.1.tar.gz -C /

.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the user manual.
