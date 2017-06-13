<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SharedBlueprintRepository")
 * @ORM\Table(name="shared_blueprint")
 */
class SharedBlueprint
{
    /**
     * @ORM\Id
     * @ORM\Column(type="string", unique=true)
     *
     * @var string
     */
    private $blueprintHash;

    /**
     * @ORM\Column(type="text")
     *
     * @var string
     */
    private $blueprintString;

    /**
     * @ORM\Column(type="string")
     *
     * @var string
     */
    private $ip;

    public function __construct(string $blueprintHash, string $blueprintString, string $ip)
    {
        $this->blueprintHash = $blueprintHash;
        $this->blueprintString = $blueprintString;
        $this->ip = $ip;
    }

    public function getBlueprintHash(): string
    {
        return $this->blueprintHash;
    }

    public function getBlueprintString(): string
    {
        return $this->blueprintString;
    }

    public function getIp(): string
    {
        return $this->ip;
    }
}