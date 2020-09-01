.. Copyright (C) 2020 Wazuh, Inc.

.. _amazon_supported_services:

Supported services
==================

.. meta::
  :description: Supported services

All the services except ``Inspector`` and ``CloudWatch Logs`` get their data from log files stored in an ``S3`` bucket. These services store their data into log files which are configured inside ``<bucket type='TYPE'> </bucket>`` tags, while ``Inspector`` and ``CloudWatch Logs`` services are configured inside ``<service type='inspector'> </service>`` and ``<service type='cloudwatchlogs'> </service>`` tags, respectively.

The next table contains the more relevant information about configuring each service in ``ossec.conf``:

+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+
| **Provider** | **Service**                                      | **Configuration tag** | **Type**       | **Path to logs**                                                                            |
+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+
| Amazon       | :ref:`CloudTrail <amazon_cloudtrail>`            | bucket                | cloudtrail     | <bucket_name>/<prefix>/AWSLogs/<account_id>/CloudTrail/<region>/<year>/<month>/<day>        |
+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+
| Amazon       | :ref:`VPC <amazon_vpc>`                          | bucket                | vpcflow        | <bucket_name>/<prefix>/AWSLogs/<account_id>/vpcflowlogs/<region>/<year>/<month>/<day>       |
+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+
| Amazon       | :ref:`Config <amazon_config>`                    | bucket                | config         | <bucket_name>/<prefix>/AWSLogs/<account_id>/Config/<region>/<year>/<month>/<day>            |
+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+
| Amazon       | :ref:`KMS <amazon_kms>`                          | bucket                | custom         | <bucket_name>/<prefix>/<year>/<month>/<day>                                                 |
+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+
| Amazon       | :ref:`Macie <amazon_macie>`                      | bucket                | custom         | <bucket_name>/<prefix>/<year>/<month>/<day>                                                 |
+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+
| Amazon       | :ref:`Trusted Advisor <amazon_trusted_advisor>`  | bucket                | custom         | <bucket_name>/<prefix>/<year>/<month>/<day>                                                 |
+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+
| Amazon       | :ref:`GuardDuty <amazon_guardduty>`              | bucket                | guardduty      | <bucket_name>/<prefix>/<year>/<month>/<day>/<hh>                                            |
+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+
| Amazon       | :ref:`WAF <amazon_waf>`                          | bucket                | waf            | <bucket_name>/<prefix>/<year>/<month>/<day>/<hh>                                            |
+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+
| Amazon       | :ref:`Inspector <amazon_inspector>`              | service               | inspector      |                                                                                             |
+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+
| Amazon       | :ref:`CloudWatch Logs <aws_cloudwatchlogs>`      | service               | cloudwatchlogs |                                                                                             |
+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+
| Cisco        | :ref:`Umbrella <cisco_umbrella>`                 | bucket                | cisco_umbrella | <bucket_name>/<prefix>/<year>-<month>-<day>                                                 |
+--------------+--------------------------------------------------+-----------------------+----------------+---------------------------------------------------------------------------------------------+

.. toctree::
    :maxdepth: 1
    :hidden:

    cloudtrail
    vpc
    config
    kms
    macie
    trusted-advisor
    guardduty
    waf
    inspector
    cloudwatchlogs
    cisco-umbrella
