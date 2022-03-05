<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Platforms\AbstractMySQLPlatform;
use Doctrine\DBAL\Platforms\OraclePlatform;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;
use Doctrine\Migrations\Exception\AbortMigration;

final class Version20220305113246 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Initialize DB';
    }

    public function up(Schema $schema): void
    {
        if ($this->connection->getDatabasePlatform() instanceof OraclePlatform) {
            $this->addSql(
                <<<'SQL'
                    CREATE TABLE SHARED_BLUEPRINT
                    (
                        BLUEPRINT_HASH   VARCHAR2(255)             NOT NULL,
                        BLUEPRINT_STRING CLOB                      NOT NULL,
                        IP               VARCHAR2(255)             NOT NULL,
                        DATE_CREATED     TIMESTAMP(0) DEFAULT NULL NULL,
                        PRIMARY KEY (BLUEPRINT_HASH)
                    )
                SQL
            );
        } elseif ($this->connection->getDatabasePlatform() instanceof AbstractMySQLPlatform) {
            $this->addSql(
                /** @lang MySQL */ <<<'SQL'
                    CREATE TABLE shared_blueprint
                    (
                        blueprint_hash   VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`,
                        blueprint_string LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`,
                        ip               VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`,
                        date_created     DATETIME DEFAULT NULL,
                        PRIMARY KEY (blueprint_hash)
                    ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = '' 
                SQL
            );
        } else {
            throw new AbortMigration("Unknown platform");
        }
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE SHARED_BLUEPRINT');
    }
}
