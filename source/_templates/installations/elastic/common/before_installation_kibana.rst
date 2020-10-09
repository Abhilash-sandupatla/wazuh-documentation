.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

        .. group-tab:: Yum

            Install all the required utilities:

                .. code-block:: console

                    # yum install curl libcap

        .. group-tab:: APT

            Install all the required utilities:

                .. code-block:: console

                    # apt install curl apt-transport-https libcap2-bin

        .. group-tab:: ZYpp

            Install all the required utilities:

                .. code-block:: console

                    # zypper install curl
                    # zypper install libcap-progs $debug || zypper install libcap2

.. End of include file
