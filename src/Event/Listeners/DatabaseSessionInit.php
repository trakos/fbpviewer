<?php

namespace App\Event\Listeners;

use Doctrine\DBAL\Event\ConnectionEventArgs;
use Doctrine\DBAL\Event\Listeners\OracleSessionInit;
use Doctrine\DBAL\Platforms\OraclePlatform;

class DatabaseSessionInit extends OracleSessionInit
{
    public function postConnect(ConnectionEventArgs $args)
    {
        if (!$args->getConnection()->getDatabasePlatform() instanceof OraclePlatform) {
            return;
        }

        parent::postConnect($args);
    }
}
