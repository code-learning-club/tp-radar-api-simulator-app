<?php

namespace App\Controllers;

use App\Controllers\Controller;
use Bow\Http\Request;

class ManagerController extends Controller
{
    /**
     * Show index
     *
     * @param Request $request
     * @return string
     */
    public function __invoke(Request $request)
    {
        return $this->render('index');
    }

    /**
     * Get the order list
     *
     * @return mixed
     */
    public function getOrders()
    {
        return $this->render('order');
    }

    /**
     * Get the order list
     *
     * @return mixed
     */
    public function getCurrentCarts()
    {
        return $this->render('cart');
    }
}
