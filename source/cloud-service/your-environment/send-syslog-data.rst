.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_send_syslog:

.. meta::
  :description: Learn about your environment

Forward syslog events
=====================

Wazuh agents can run on a wide range of operative systems, but when it is not possible due to software incompatibilities or business restrictions, you can forward syslog events to your environment. This is a common use case for network devices such as routers or firewalls.

Since every communication with your environment is performed through the Wazuh agent, you have to configure the agent to forward the syslog events. To do so, you have these options:

- `rsyslog on Linux`_

- `Logstash on Windows`_

rsyslog on Linux
^^^^^^^^^^^^^^^^

Use rsyslog on a Linux host with a Wazuh agent to log to a file and send those logs to the environment.

1. Configure rsyslog to receive syslog events and enable the TCP or UDP settings by editing ``/etc/rsyslog.conf``.

- For TCP:

   .. code-block::

      $ModLoad imtcp
      $InputTCPServerRun <PORT>

- For UDP:

   .. code-block::

      $ModLoad imudp
      $UDPServerRun <PORT>

   Make sure to review your firewall/SELinux configuration to allow this communication.
 
2. Configure rsyslog to forward events to a file by editing ``/etc/rsyslog.conf``.

   .. code-block::

      # Storing Messages from a Remote System into a specific File
      if $fromhost-ip startswith 'xxx.xxx.xxx.' then /var/log/<file_name.log>
      & ~

To perform the following steps, make sure to replace ``<file_name.log>`` with the name chosen for this log.

3. Deploy a Wazuh agent on the same host that has rsyslog.

4. Configure the agent to read the syslog output file by editing ``/var/ossec/etc/ossec.conf``.

   .. code-block:: XML

      <localfile>
      <log_format>syslog</log_format>
      <location>/var/log/<file_name.log></location>
      </localfile>

5. Restart rsyslog and the Wazuh agent.

   .. code-block:: console

      # systemctl restart rsyslog
      # systemctl restart wazuh-agent
   
Logstash on Windows
^^^^^^^^^^^^^^^^^^^
   
Use Logstash on a Windows host with a Wazuh agent to receive syslog, log to a file, and send those logs to the environment.

1. Install Logstash.

   #. `Download the Logstash <https://www.elastic.co/downloads/logstash>`_ ZIP package.
   #. Extract the ZIP contents into a local folder. For example, to ``C:\logstash\``.

2. Install ``logstash-input-syslog`` and ``logstash-output-file`` plugins.

   .. code-block::
      
      C:\logstash\bin>logstash-plugin install logstash-input-syslog

   .. code-block::
               
      C:\logstash\bin>logstash-plugin install logstash-output-file

   If you are using PowerShell, make sure to add ``.\`` before the executable: ``.\logstash-plugin``

3. Configure Logstash.

   Create the following file: ``C:\logstash\config\logstash.conf``

   .. code-block::

      input {
         syslog {
            port => <PORT>
         }
      }
      
      output {
         file {
            path => "C:\logstash\logs\file_name.log"
            codec => "line"
         }
      }

To perform the following steps, make sure to replace ``file_name.log`` with the name chosen for this log.

4. Deploy a Wazuh agent on the same host that has Logstash.
   
5. Configure the agent to read the Logstash output file.

   Edit ``C:\Program Files (x86)\ossec-agent\ossec.conf`` by adding the following configuration:

   .. code-block:: XML

      <ossec_config>
      <localfile>
         <log_format>syslog</log_format>
         <location>C:\logstash\logs\file_name.log</location>
      </localfile>
      </ossec_config>

6. Restart Logstash.

   #. Run Logstash from the command line:

      .. code-block:: console
   
         C:\logstash\bin\logstash.bat -f C:\logstash\config\logstash.conf
   
   #. `Install Logstash as a Windows Service <https://www.elastic.co/guide/en/logstash/current/running-logstash-windows.html#running-logstash-windows>`_ either using `NSSM <https://www.elastic.co/guide/en/logstash/current/running-logstash-windows.html#running-logstash-windows-nssm>`_ or `Windows Task Scheduler <https://www.elastic.co/guide/en/logstash/current/running-logstash-windows.html#running-logstash-windows-scheduledtask>`_.

7. Restart the Wazuh agent. If you are running PowerShell, use the following command:

   .. code-block:: console
      
      Restart-Service OssecSvc
