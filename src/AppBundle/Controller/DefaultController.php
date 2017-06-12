<?php

namespace AppBundle\Controller;

use FactorioBlueprintLib\TestCases;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir')) . DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/share", name="share_blueprint", )
     */
    public function shareAction(Request $request)
    {
        $blueprintString = $request->getContent();

        if (!$this->isBlueprintValid($blueprintString)) {
            return new JsonResponse(['error' => 'Blueprint string isn\'t valid'], Response::HTTP_BAD_REQUEST);
        }

        return new JsonResponse(['url' => 'just testing'], Response::HTTP_ACCEPTED);
    }

    protected function isBlueprintValid($blueprintString)
    {
        $prevHandler = set_error_handler(function ($errno, $errstr, $errfile, $errline, array $errcontext) {
            throw new \ErrorException($errstr, 0, $errno, $errfile, $errline);
        });

        try {
            $blueprintString = substr($blueprintString, 1);
            $blueprintString = base64_decode($blueprintString);
            $blueprintString = zlib_decode($blueprintString);
            $blueprintString = json_decode($blueprintString, JSON_OBJECT_AS_ARRAY);
        } catch (\Exception $e) {
            return false;
        } finally {
            set_error_handler($prevHandler);
        }

        return true;
    }

    /**
     * @Route("/blueprint", name="blueprint")
     */
    public function blueprintAction(Request $request)
    {
        $blueprintString = TestCases::ROBO_MALL;
        $version = $blueprintString[0];

        return new JsonResponse(['version' => $version, 'blueprint' => $blueprintString]);
    }
}
