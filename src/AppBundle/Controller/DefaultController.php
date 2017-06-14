<?php

namespace AppBundle\Controller;

use AppBundle\Manager\SharedBlueprintManager;
use FactorioBlueprintLib\TestCases;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        return $this->render('default/index.html.twig', [
            'blueprint_string' => TestCases::REDDIT_BOOK
        ]);
    }

    /**
     * @Route("/b/{blueprintHash}", requirements={"blueprintHash" = "[a-zA-Z0-9_-]+"})
     */
    public function blueprintAction(string $blueprintHash, Request $request)
    {
        $blueprint = $this->getSharedBlueprintManager()->getSharedBlueprint($blueprintHash);
        if (!$blueprint) {
            throw new NotFoundHttpException();
        }

        return $this->render('default/index.html.twig', [
            'blueprint_string' => $blueprint->getBlueprintString()
        ]);
    }

    /**
     * @Route("/share", name="share_blueprint")
     * @Method({"POST"})
     */
    public function shareAction(Request $request)
    {
        $blueprintString = $request->getContent();

        if (!$this->isBlueprintValid($blueprintString)) {
            return new JsonResponse(['error' => 'Blueprint string isn\'t valid'], Response::HTTP_BAD_REQUEST);
        }

        return new JsonResponse(['url' => $this->getUrl($blueprintString)], Response::HTTP_ACCEPTED);
    }

    /**
     * @Route("/debug", name="debug")
     */
    public function debugAction(Request $request)
    {
        return new JsonResponse(['ip' => $request->getClientIp()]);
    }

    protected function getUrl($blueprintString)
    {
        $sharedBlueprint = $this->getSharedBlueprintManager()->shareBlueprint($blueprintString);

        $host = $this->getParameter('shared_blueprint_host');

        return $host . '/b/' . $sharedBlueprint->getBlueprintHash();
    }

    protected function getSharedBlueprintManager(): SharedBlueprintManager
    {
        return $this->get('app.shared_blueprint_manager');
    }

    protected function isBlueprintValid($blueprintString)
    {
        $prevHandler = set_error_handler(function ($errno, $errstr, $errfile, $errline, array $errcontext) {
            throw new \ErrorException($errstr, 0, $errno, $errfile, $errline);
        });

        try {
            $this->parseBlueprint($blueprintString);
        } catch (\Exception $e) {
            return false;
        } finally {
            set_error_handler($prevHandler);
        }

        return true;
    }

    protected function parseBlueprint(string $blueprintString)
    {
        $blueprintString = substr($blueprintString, 1);
        $blueprintString = base64_decode($blueprintString);
        $blueprintString = zlib_decode($blueprintString);
        return json_decode($blueprintString, JSON_OBJECT_AS_ARRAY);
    }
}
