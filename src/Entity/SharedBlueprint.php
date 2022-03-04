<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SharedBlueprintRepository")
 * @ORM\Table(name="shared_blueprint")
 */
class SharedBlueprint
{
    /**
     * @ORM\Id
     * @ORM\Column(type="string", unique=true)
     */
    private string $blueprintHash;

    /**
     * @ORM\Column(type="text")
     */
    private string $blueprintString;

    /**
     * @ORM\Column(type="string")
     */
    private string $ip;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private \DateTime $dateCreated;

    public function __construct(string $blueprintHash, string $blueprintString, string $ip)
    {
        $this->blueprintHash = $blueprintHash;
        $this->blueprintString = $blueprintString;
        $this->ip = $ip;
        $this->dateCreated = new \DateTime();
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

    public function getDateCreated(): \DateTime
    {
        return $this->dateCreated;
    }
}