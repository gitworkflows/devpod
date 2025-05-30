-- Copyright (c) 2020 Devpod GmbH. All rights reserved.
-- Licensed under the GNU Affero General Public License (AGPL). See License.AGPL.txt in the project root for license information.


-- create test DB user
SET @devpodDbPassword = IFNULL(@devpodDbPassword, 'test');

SET @statementStr = CONCAT(
    'CREATE USER IF NOT EXISTS "devpod"@"%" IDENTIFIED BY "', @devpodDbPassword, '";'
);
SELECT @statementStr ;
PREPARE stmt FROM @statementStr; EXECUTE stmt; DEALLOCATE PREPARE stmt;
