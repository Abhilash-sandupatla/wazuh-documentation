.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable kibana.service
      # systemctl start kibana.service



  .. group-tab:: SysV Init

    Choose one option according to the OS used:

    a) RPM based OS:

      .. code-block:: console

        # chkconfig --add kibana
        # service kibana start
    
    b) Debian based OS:

      .. code-block:: console

        # update-rc.d kibana defaults 95 10
        # service kibana start

.. End of include file
