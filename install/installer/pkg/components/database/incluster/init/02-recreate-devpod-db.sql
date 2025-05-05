-- Copyright (c) 2020 Devpod GmbH. All rights reserved.
-- Licensed under the GNU Affero General Public License (AGPL). See License.AGPL.txt in the project root for license information.

-- must be idempotent

-- @devpodDB contains name of the DB the script manipulates, and is replaced by the file reader
SET
@devpodDB = IFNULL(@devpodDB, '`__DEVPOD_DB_NAME__`');

SET
@statementStr = CONCAT('DROP DATABASE IF EXISTS ', @devpodDB);
PREPARE statement FROM @statementStr;
EXECUTE statement;

SET
@statementStr = CONCAT('CREATE DATABASE ', @devpodDB, ' CHARSET utf8mb4');
PREPARE statement FROM @statementStr;
EXECUTE statement;
