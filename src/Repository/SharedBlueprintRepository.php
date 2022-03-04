<?php

namespace App\Repository;

use App\Entity\SharedBlueprint;
use Doctrine\ORM\EntityRepository;

class SharedBlueprintRepository extends EntityRepository
{
    public function save(SharedBlueprint $sharedBlueprint)
    {
        $this->getEntityManager()->persist($sharedBlueprint);
        $this->getEntityManager()->flush($sharedBlueprint);
    }
}