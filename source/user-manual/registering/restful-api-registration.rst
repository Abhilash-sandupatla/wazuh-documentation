.. Copyright (C) 2020 Wazuh, Inc.

.. _restful-api-registration:

Registering the Wazuh agents using the Wazuh API
================================================

The Wazuh API allows the Wazuh agent registration by running a single request from any host. This request returns the Wazuh agent's registration key, which must be manually added to the Wazuh agent using ``manage_agents`` utility.

.. note:: Root user privileges are necessary to execute all the commands described below, and the Wazuh API must be accessible from the host on which the API request is executed.

Choose the tab corresponding to the Wazuh agent host operating system:

.. tabs::


  .. group-tab:: Linux/Unix host


    #. Open a terminal in the Wazuh agent's host as a ``root`` user. To add the Wazuh agent to the Wazuh manager and extract the registration key execute the API request replacing the values in the angle brackets:

         .. code-block:: console

           # curl -u <API_username>:<API_password> -k -X POST -d '{"name":"<agent_name>","ip":"<agent_IP>"}' -H 'Content-Type:application/json' "https://<manager_IP>:55000/agents?pretty"

         The output of the API request returns the registration key:

         .. code-block:: none
                :class: output

                {
                 "error": 0,
                 "data": {
                     "id": "001",
                     "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="
                 }
                }

         More information about API credentials and HTTPS support can be found on :ref:`Wazuh API configuration<api_configuration>`.


    #. Import the registration key to the Wazuh agent using ``manage_agents`` utility. Replace the Wazuh agent's registration key:

         .. code-block:: console

          # /var/ossec/bin/manage_agents -i <key>

         An example output of the command looks as follows:

         .. code-block:: none
                :class: output

                Agent information:
                   ID:001
                   Name:agent_1
                   IP Address:any

                Confirm adding it?(y/n): y
                Added.


    #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``/var/ossec/etc/ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


    #. Restart the Wazuh agent:

      .. include:: ../../_templates/common/linux/restart_agent.rst



  .. group-tab:: Windows host


    Open a Powershell session in the Wazuh agent's host as an ``Administrator``.

    .. include:: ../../_templates/windows/installation_directory.rst


    #. Add the Wazuh agent to the Wazuh manager.

         If the Wazuh API is running over HTTPS and it is using a self-signed certificate, the function below has to be executed in Powershell:

         .. code-block:: powershell

          > function Ignore-SelfSignedCerts {
              add-type @"
                  using System.Net;
                  using System.Security.Cryptography.X509Certificates;
                  public class PolicyCert : ICertificatePolicy {
                      public PolicyCert() {}
                      public bool CheckValidationResult(
                          ServicePoint sPoint, X509Certificate cert,
                          WebRequest wRequest, int certProb) {
                          return true;
                      }
                  }
          "@
              [System.Net.ServicePointManager]::CertificatePolicy = new-object PolicyCert
              [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12;
          }

          > Ignore-SelfSignedCerts

         Use ``Invoke-WebRequest`` to execute the Wazuh API request to register the Wazuh agent. Values in the angle brackets have to be replaced:

         .. code-block:: console

          # $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f <API_username>, <API_password>)))
          # Invoke-WebRequest -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -Method POST -Uri https://<manager_IP>:55000/agents -Body @{name=<agent_name>} | ConvertFrom-Json

         The command above returns the Wazuh agent's ``ID``.


    #. Extract the Wazuh agent's key using the Wazuh agent's ID. Values in the angle brackets have to be replaced:

         .. code-block:: console

          # Invoke-WebRequest -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -Method GET -Uri https://<manager_IP>:55000/agents/<agent_ID>/key | ConvertFrom-Json

         The output of the request returns the registration key:

         .. code-block:: none
                :class: output

                {
                  "error": 0,
                  "data": {
                      "id": "001",
                      "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="
                 }
                }


    #. Import the registration key to the Wazuh agent using ``manage_agents`` utility:

         .. code-block:: console

          # 'C:\Program Files (x86)\ossec-agent\manage_agents' -i <key>

         An example output of the command looks as follows:

         .. code-block:: none
                :class: output

                Agent information:
                   ID:001
                   Name:agent_1
                   IP Address:any

                Confirm adding it?(y/n): y
                Added.


    #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``C:\Program Files (x86)\ossec-agent\ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


    #. Restart the Wazuh agent:

      .. include:: ../../_templates/common/windows/restart_agent.rst



  .. group-tab:: MacOS X host


    #. Open a terminal in the Wazuh agent host as a ``root`` user. To add the Wazuh agent to the Wazuh manager and extract the registration key execute the API request replacing the values in the brackets:

         .. code-block:: console

          # curl -u <API_username>:<API_password> -k -X POST -d '{"name":"<agent_name>","ip":"<agent_IP>"}' -H 'Content-Type:application/json' "https://<manager_IP>:55000/agents?pretty"

         The output of the API request returns the registration key:

         .. code-block:: none
                :class: output

                {
                 "error": 0,
                 "data": {
                   "id": "001",
                   "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="
                 }
                }

         More information about API credentials and HTTPS support can be found on :ref:`Wazuh API configuration<api_configuration>`.


    #. Import the registration key to the Wazuh agent using ``manage_agents`` utility. Replace the Wazuh agent's registration key:

         .. code-block:: console

           # /Library/Ossec/bin/manage_agents -i <key>

         An example output of the command looks as follows:

         .. code-block:: none
                :class: output

                Agent information:
                    ID:001
                    Name:agent_1
                    IP Address:any

                Confirm adding it?(y/n): y
                Added.


    #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``/Library/Ossec/etc/ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


    #. Restart the Wazuh agent:

      .. include:: ../../_templates/common/macosx/restart_agent.rst
