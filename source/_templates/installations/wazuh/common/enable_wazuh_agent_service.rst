.. Copyright (C) 2021 Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-agent --now


  .. group-tab:: SysV Init

    Choose one option according to your operating system.

    a) RPM based operating systems:

      .. code-block:: console

        # chkconfig --add wazuh-agent
        # service wazuh-agent start

    b) Debian based operating systems:

      .. code-block:: console

        # update-rc.d wazuh-agent defaults 95 10
        # service wazuh-agent start

.. End of include file