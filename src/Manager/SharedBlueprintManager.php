<?php

namespace App\Manager;

use App\Entity\SharedBlueprint;
use App\Repository\SharedBlueprintRepository;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\HttpFoundation\RequestStack;

class SharedBlueprintManager
{
    private SharedBlueprintRepository $repository;
    private RequestStack $requestStack;

    public function __construct(SharedBlueprintRepository $repository, RequestStack $requestStack)
    {
        $this->repository = $repository;
        $this->requestStack = $requestStack;
    }

    public function getSharedBlueprint(string $hash): ?SharedBlueprint
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
        return $this->requestStack->getMainRequest()->getClientIp();
    }

    #[Pure]
    protected function createHash(string $blueprintString): string
    {
        return $this->base64urlEncode(sha1($blueprintString, true));
    }

    #[Pure]
    protected function base64urlEncode($data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    #[Pure]
    protected function base64urlDecode($data): string
    {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }
}