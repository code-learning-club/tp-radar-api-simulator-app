<?php

use App\Controllers\ManagerController;

$app->get('/', ManagerController::class)->name('app.index');
$app->get('/orders', 'ManagerController::getOrders');
$app->get('/carts', 'ManagerController::getCurrentCarts');

$app->get('/api/products', 'ApiController::getProducts');
$app->get('/api/orders', 'ApiController::getOrders');
$app->get('/api/carts', 'ApiController::getCurrentCarts');

$app->post('/api/carts', 'ApiController::pushToCart');
$app->delete('/api/carts/clear', 'ApiController::clearCart');

$app->post('/api/orders', 'ApiController::processOrder');
$app->post('/api/callback', 'ApiController::processPaymentCallback');
