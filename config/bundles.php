<?php

return [
    Symfony\Bundle\FrameworkBundle\FrameworkBundle::class                => ['all' => true],
    Symfony\Bundle\SecurityBundle\SecurityBundle::class                  => ['all' => true],
    Symfony\Bundle\TwigBundle\TwigBundle::class                          => ['all' => true],
    Symfony\Bundle\MonologBundle\MonologBundle::class                    => ['all' => true],
    Doctrine\Bundle\DoctrineBundle\DoctrineBundle::class                 => ['all' => true],
    Mopa\Bundle\BootstrapBundle\MopaBootstrapBundle::class               => ['all' => true],
    Symfony\WebpackEncoreBundle\WebpackEncoreBundle::class               => ['all' => true],
    Symfony\Bundle\DebugBundle\DebugBundle::class                        => ['dev' => true],
    Symfony\Bundle\WebProfilerBundle\WebProfilerBundle::class            => ['dev' => true],
];
