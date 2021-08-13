.. Copyright (C) 2021 Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable kibana --now



  .. group-tab:: SysV Init

    Choose one option according to the operating system used:

    a) RPM based operating system:

      .. code-block:: console

        # chkconfig --add kibana
        # service kibana start
    
    b) Debian based operating system:

      .. code-block:: console

        # update-rc.d kibana defaults 95 10
        # service kibana start

.. End of include file
