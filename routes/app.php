<?php

use App\Controllers\ManagerController;

$app->get('/', ManagerController::class)->name('app.index');
