<?php

namespace App\Controller;

use App\FactorioBlueprintLib\TestCases;
use App\Manager\SharedBlueprintManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class DefaultController extends AbstractController
{
    #[Route('/', name: 'homepage')]
    public function indexAction(Request $request): Response
    {
        return $this->render('default/index.html.twig', [
            'blueprint_string' => TestCases::REDDIT_BOOK,
        ]);
    }

    #[Route('/b/{blueprintHash}', name: 'blueprint', requirements: ['blueprintHash' => '[a-zA-Z0-9_-]+'])]
    public function blueprintAction(string $blueprintHash, SharedBlueprintManager $blueprintManager): Response
    {
        $blueprint = $blueprintManager->getSharedBlueprint($blueprintHash);
        if (!$blueprint) {
            throw new NotFoundHttpException();
        }

        return $this->render('default/index.html.twig', [
            'blueprint_string' => $blueprint->getBlueprintString(),
        ]);
    }

    #[Route('/share', name: 'share_blueprint', methods: ['POST'])]
    public function shareAction(Request $request, SharedBlueprintManager $blueprintManager): Response
    {
        $blueprintString = $request->getContent();

        if (!$this->isBlueprintValid($blueprintString)) {
            return new JsonResponse(['error' => 'Blueprint string isn\'t valid'], Response::HTTP_BAD_REQUEST);
        }

        return new JsonResponse(['url' => $this->getUrl($blueprintString, $blueprintManager)], Response::HTTP_ACCEPTED);
    }

    #[Route('/debug', name: 'debug')]
    public function debugAction(Request $request): Response
    {
        return new JsonResponse(['ip' => $request->getClientIp()]);
    }

    private function getUrl($blueprintString, SharedBlueprintManager $blueprintManager): string
    {
        $sharedBlueprint = $blueprintManager->shareBlueprint($blueprintString);

        return $this->generateUrl(
            'blueprint',
            ['blueprintHash' => $sharedBlueprint->getBlueprintHash()],
            UrlGeneratorInterface::ABSOLUTE_URL
        );
    }

    private function isBlueprintValid($blueprintString): bool
    {
        $prevHandler = set_error_handler(function ($errno, $errstr, $errfile, $errline, array $errorContext) {
            throw new \ErrorException($errstr, 0, $errno, $errfile, $errline);
        });

        try {
            return is_array($this->parseBlueprint($blueprintString));
        } catch (\Exception $e) {
            return false;
        } finally {
            set_error_handler($prevHandler);
        }
    }

    private function parseBlueprint(string $blueprintString): array
    {
        $blueprintString = substr($blueprintString, 1);
        $blueprintString = base64_decode($blueprintString);
        $blueprintString = zlib_decode($blueprintString);
        return json_decode($blueprintString, JSON_OBJECT_AS_ARRAY);
    }
}
