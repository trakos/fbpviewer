<?php

namespace AppBundle\Manager;

use AppBundle\Entity\SharedBlueprint;
use AppBundle\Repository\SharedBlueprintRepository;
use Symfony\Component\HttpFoundation\RequestStack;

class SharedBlueprintManager
{
    /**
     * @var SharedBlueprintRepository
     */
    protected $repository;

    /**
     * @var RequestStack
     */
    protected $requestStack;

    public function __construct(SharedBlueprintRepository $repository, RequestStack $requestStack)
    {
        $this->repository = $repository;
        $this->requestStack = $requestStack;
    }

    /**
     * @param string $hash
     *
     * @return null|SharedBlueprint
     */
    public function getSharedBlueprint(string $hash)
    {
        return $this->repository->find($hash);
    }

    public function shareBlueprint(string $blueprintString): SharedBlueprint
    {
        $hash = $this->createHash($blueprintString);
        $sharedBlueprint = $this->repository->find($hash);
        if (!$sharedBlueprint) {
            $sharedBlueprint = new SharedBlueprint($hash, $blueprintString, $this->getIp());
            $this->repository->save($sharedBlueprint);
        }

        return $sharedBlueprint;
    }

    protected function getIp(): string
    {
        return $this->requestStack->getMasterRequest()->getClientIp();
    }

    protected function createHash(string $blueprintString): string
    {
        return $this->base64urlEncode(sha1($blueprintString, true));
    }

    protected function base64urlEncode($data)
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    protected function base64urlDecode($data)
    {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }
}