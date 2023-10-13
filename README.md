# Upload Csv Data to MySQL DB

#### Technologies Used
  Sails.js  
  MySQL  


#### MySQL Config 
configuration file path :- config/datastores.js  
mysql host : 127.0.0.1  
mysql user : root  
mysql pass : root     
mysql db name : alert_db  

##### table schema 

CREATE TABLE `customers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(200) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `phone1` varchar(255) DEFAULT NULL,
  `phone2` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `subscription_date` date DEFAULT NULL,
  `website` varchar(250) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_IDX_CUSTOMERID` (`customer_id`)
) ENGINE=InnoD;




### Version info

This app was originally generated on Mon Apr 11 2022 18:11:44 GMT+0530 (India Standard Time) using Sails v1.4.3.

<!-- Internally, Sails used [`sails-generate@2.0.3`](https://github.com/balderdashy/sails-generate/tree/v2.0.3/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

