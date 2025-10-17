<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods'   => ['*'],
    'allowed_origins' => [env('APP_URL'), 'localhost', env('FRONTEND_URL', 'http://localhost:3000'), 'localhost:3000', 'https://localhost:3000'],
    'allowed_origins_patterns' => ['*'],
    'allowed_headers'   => ['*'],
    'exposed_headers'   => [],
    'max_age'           => 3600,
    'supports_credentials' => false,
];
