<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20220304221015 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Initialize DB';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(
            <<<'SQL'
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
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE shared_blueprint');
    }
}
