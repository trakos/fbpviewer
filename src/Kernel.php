<?php

namespace App;

use Symfony\Bundle\FrameworkBundle\Kernel\MicroKernelTrait;
use Symfony\Component\HttpKernel\Kernel as BaseKernel;

class Kernel extends BaseKernel
{
    use MicroKernelTrait;

    public function boot(): void
    {
        if (!$this->booted) {
            $this->initializeOracleWallet();
        }

        parent::boot();
    }

    private function initializeOracleWallet(): void
    {
        $walletFile = $this->getProjectDir() . '/var/cwallet.sso';
        if (isset($_ENV['ORACLE_CWALLET_SSO']) && !file_exists($walletFile)) {
            file_put_contents($walletFile, base64_decode($_ENV['ORACLE_CWALLET_SSO']));
        }
    }
}
