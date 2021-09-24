.. Copyright (C) 2021 Wazuh, Inc.

.. _reference_ossec_active_response_manager:

active-response
===============

.. topic:: XML section name

	.. code-block:: xml

		<active-response>
		</active-response>

In the active response configuration section, an existing command is bound to one or more rules or rule types along with additional criteria for when to execute the command. There is no limit to the number of active responses that can be used, however, each active response must be configured in its own separate ``<active-response>`` section.

.. note:: It is also necessary to include active-response configuration on the agent side, check :ref:`here <reference_ossec_active_response_agent>`.

Options
-------

- `disabled`_
- `command`_
- `location`_
- `agent_id`_
- `level`_
- `rules_group`_
- `rules_id`_
- `timeout`_

disabled
^^^^^^^^

Toggles the active-response capability on and off. Setting this option to ``yes`` on ``manager.conf`` file disables active-response on the manager and all agents.

.. note::

    This option is available on server, local, and agent installations.

+--------------------+------------+
| **Default value**  | no         |
+--------------------+------------+
| **Allowed values** | yes, no    |
+--------------------+------------+


command
^^^^^^^

Links the active-response to the command. You can find more information at the :doc:`commands <commands>` section.

+--------------------+-------------------------------------------+
| **Default value**  | n/a                                       |
+--------------------+-------------------------------------------+
| **Allowed values** | Any defined active response command name  |
+--------------------+-------------------------------------------+

location
^^^^^^^^

Indicates which system(s) the command should be executed on.

+--------------------+----------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                              |
+--------------------+---------------+------------------------------------------------------------------+
| **Allowed values** | local         | This runs the command on the agent that generated the event.     |
+                    +---------------+------------------------------------------------------------------+
|                    | server        | This runs the command on the Wazuh manager.                      |
+                    +---------------+------------------------------------------------------------------+
|                    | defined-agent | This runs the command on a specific agent identified by agent_id.|
+                    +---------------+------------------------------------------------------------------+
|                    | all           | This runs the command on all agents, not including the manager.  |
|                    |               | Use with caution.                                                |
+--------------------+---------------+------------------------------------------------------------------+

Example:

If the application that interfaces with your edge firewall runs on one of your agents, you might have a firewall-block-edge command that runs a script on that agent to blacklist an offending IP on the edge firewall.

.. note::
    If it is desired to trigger a particular active response on every agent and
    the manager as well, two similar configuration blocks can be used setting 
    the option `"all"` in one of the blocks and `"server"` on the other.

agent_id
^^^^^^^^

Specifies the ID of the agent on which to execute the active response command (used when defined-agent is set).

+--------------------+--------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                  |
+--------------------+--------------------------------------------------------------------------------------+
| **Allowed values** | Any agent id number, as long as **defined-agent** has been specified as the location.|
+--------------------+--------------------------------------------------------------------------------------+

level
^^^^^

Defines a minimum severity level required for the command to be executed.

+--------------------+------------------------+
| **Default value**  | n/a                    |
+--------------------+------------------------+
| **Allowed values** | Any level from 1 to 16 |
+--------------------+------------------------+


rules_group
^^^^^^^^^^^

Defines the rule group that a rule must belong to one for the command to be executed.

+--------------------+---------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                         |
+--------------------+---------------------------------------------------------------------------------------------+
| **Allowed values** | Any rule group is allowed. Multiple groups should be separated with a pipe character (“|”). |
+--------------------+---------------------------------------------------------------------------------------------+

.. note::
	All groups must end with a comma.

rules_id
^^^^^^^^

Limits the command execution to only when one or more listed rules fire.

+--------------------+---------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                             |
+--------------------+---------------------------------------------------------------------------------+
| **Allowed values** | Any rule identification. Multiple IDs can be specified if separated by a comma. |
+--------------------+---------------------------------------------------------------------------------+

.. note::
    When setting ``level``, ``rules_group`` and ``rules_id`` together, the active response will be triggered always that any rule matches with **one** of these options. In other words,
    they are accumulative options, not restrictive.


timeout
^^^^^^^

Specifies how long in seconds before the reverse command is executed.  When ``repeated_offenders`` is used, ``timeout`` only applies to the first offense.

+--------------------+-----------------------------+
| **Default value**  | n/a                         |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

Sample Configuration
--------------------

.. code-block:: xml

    <!-- On the manager.conf file -->

    <active-response>
      <disabled>no</disabled>
      <command>host-deny</command>
      <location>defined-agent</location>
      <agent_id>032</agent_id>
      <level>10</level>
      <rules_group>sshd,|pci_dss_11.4,</rules_group>
      <timeout>1</timeout>
    </active-response>
