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
            'base_dir' => realpath($this->getParameter('kernel.root_dir')).DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/blueprint", name="blueprint")
     */
    public function blueprintAction(Request $request)
    {
        $blueprintString = TestCases::UNLOADER;
        $version = $blueprintString[0];
        $blueprintString = substr($blueprintString, 1);
        $blueprintString = base64_decode($blueprintString);
        $blueprintString = zlib_decode($blueprintString);
        $blueprintString = json_decode($blueprintString, JSON_OBJECT_AS_ARRAY);

        return new JsonResponse(['version' => $version, 'blueprint' => $blueprintString]);
    }
}
