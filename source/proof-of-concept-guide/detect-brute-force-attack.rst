
.. meta::
  :description: This POC shows how Wazuh provides out-of-the-box rules capable of identifying brute-force attacks by correlating multiple authentication failure events. Learn more in this section.

.. _poc_detect_bruteforce:

Detecting a brute-force attack
==============================

Brute forcing SSH (on Linux) or RDP (on Windows) are common attack vectors. Wazuh provides out-of-the-box rules capable of identifying brute-force attacks by correlating multiple authentication failure events.

To see an example use case where you configure an active response to block the IP of an attacker, check the :ref:`Blocking attacks with Active Response <blocking_attacks_active_response>` section of the documentation.


Configuration
-------------

Configure your environment as follows to test the POC.

- Make sure you have SSH installed and enabled in a system chosen to play as an attacker.

- Install Hydra on an external Linux system to execute the brute-force attacks. 

    .. code-block:: XML

        yum install -y hydra

Steps to generate the alerts
----------------------------

#. Replace ``<centos.agent.endpoint>`` for Linux and ``<win.agent.endpoint>`` for Windows with the appropriate destination in the following commands and run multiple failed authentication failure attempts against the monitored endpoints.

    - For the monitored Linux endpoint:

        .. code-block:: console

            # hydra -l badguy -p wrong_password <centos.agent.endpoint> ssh

    - For the monitored Windows endpoint:
  
        .. code-block:: console

            # hydra -l Administrator -p wrong_password <win.agent.endpoint> rdp


Query the alerts
----------------

In the **Wazuh Kibana Plugin**, at **Security events** module. On the search bar, add filters to query the alerts.

- Linux: ``rule.id:(5710 OR 5712)``. Other related rules are ``5711``, ``5716``, ``5720``, ``5503``, ``5504``.


.. thumbnail:: ../images/poc/Detecting_a_brute_force_attack-1.png
          :title: Detecting a brute-force attack on Linux
          :align: center
          :wrap_image: No


- Windows: ``rule.id:(60122 OR 60137)``

.. thumbnail:: ../images/poc/Detecting_a_brute_force_attack-2.png
          :title: Detecting a brute-force attack on Windows
          :align: center
          :wrap_image: No
