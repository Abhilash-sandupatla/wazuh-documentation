.. Copyright (C) 2020 Wazuh, Inc.

.. _rootkits_detection:

Rootkits detection
==================

The :ref:`Wazuh agent <wazuh_agent>` periodically scans the monitored system to detect rootkits both at the kernel and the user space level. This type of malware usually replaces or changes existing operating system components, in order to alter the behavior of the system. Rootkits can hide other processes, files, and network connections.

Wazuh uses different detection mechanisms to look for system anomalies or well-known intrusions. This is done periodically by the *Rootcheck* component:

+-------------------------------+---------------------------------+---------+-------------+
| Action                        | Detection mechanism             | Binary  | System call |
+===============================+=================================+=========+=============+
| Detection of hidden processes | Comparing output of system      | ps      | setsid      |
+                               +                                 +         +-------------+
|                               | binaries and system calls       |         | getpgid     |
+                               +                                 +         +-------------+
|                               |                                 |         | kill        |
+-------------------------------+---------------------------------+---------+-------------+
| Detection of hidden files     | Comparing output of system      | ls      | stat        |
+                               +                                 +         +-------------+
|                               | binaries and system calls       |         | opendir     |
+                               +                                 +         +-------------+
|                               |                                 |         | readdir     |
+                               +---------------------------------+---------+-------------+
|                               | Scanning /dev                   | ls      | opendir     |
+-------------------------------+---------------------------------+---------+-------------+
| Detection of hidden ports     | Comparing output of system      | netstat | bind        |
+                               +                                 +         +             +
|                               | binaries and system calls       |         |             |
+-------------------------------+---------------------------------+---------+-------------+
| Detection of known rootkits   | Using a malicious file database | \-      | stat        |
+                               +                                 +         +-------------+
|                               |                                 |         | fopen       |
+                               +                                 +         +-------------+
|                               |                                 |         | opendir     |
+                               +---------------------------------+---------+-------------+
|                               | Inspecting files content using  | \-      | fopen       |
+                               +                                 +         +             +
|                               | signatures                      |         |             |
+                               +---------------------------------+---------+-------------+
|                               | Detecting file permission and   | \-      | stat        |
+                               +                                 +         +             +
|                               | ownership anomalies             |         |             |
+-------------------------------+---------------------------------+---------+-------------+

Below is an example of an alert generated when a hidden process is found. In this case, the affected system is running a Linux kernel-level rootkit (named Diamorphine):

.. code-block:: json
  :emphasize-lines: 10,12
  :class: output

  {
    "agent": {
        "id": "1030",
        "ip": "10.0.0.59",
        "name": "diamorphine-POC"
    },
    "decoder": {
        "name": "rootcheck"
    },
    "full_log": "Process '562' hidden from /proc. Possible kernel level rootkit.",
    "rule": {
        "description": "Host-based anomaly detection event (rootcheck).",
        "id": "510",
        "level": 7
    },
    "timestamp": "2020-07-12T18:07:00-0800"
  }

More information about how does Wazuh detect rootkits can be found at the :ref:`user manual <manual_anomaly_detection>`.
