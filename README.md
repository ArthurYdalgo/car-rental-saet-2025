# Car Rental - SAET 2025

Este é o projeto para a SAET 2025 da Universidade Tecnológica Federal do Paraná (UTFPR), focado no desenvolvimento de um sistema de aluguel de veículos.

## Requisitos

** Recomenda-se o uso do Laravel Herd para facilitar a configuração do ambiente de desenvolvimento, que pode ser baixado [aqui](https://herd.laravel.com/). **

Instale as seguintes ferramentas para rodar o projeto (caso tenha optado por usar o Laravel Herd, todas essas ferramentas já estarão instaladas):
- PHP 8.2 ou superior
- Composer
- Node.js 18 ou superior
- NPM ou Yarn

## Como rodar o projeto

Instale-o usando o comando:

```bash
laravel new my-app --using=arthurydalgo/car-rental-saet-2025
```

Alternativamente, se quiser usar a versão completa (com todas as funcionalidades implementadas), use:

```bash
laravel new my-app --using=arthurydalgo/car-rental-saet-2025:dev-completed
```

Caso esteja usando Laravel Herd, navegue até o diretório do projeto, e execute:

```bash
composer run dev
```

Caso contrário, execute:

```bash
composer run dev-with-server
```