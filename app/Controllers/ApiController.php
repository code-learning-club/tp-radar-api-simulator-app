<?php

namespace App\Controllers;

use App\Controllers\Controller;
use Bow\Http\Request;
use App\Services\ProductService;
use App\Services\RadarPaymentService;

class ApiController extends Controller
{
    /**
     * The instance of product
     *
     * @var ProductService
     */
    private $productService;

    /**
     * ManagerController constructor
     *
     * @param ProductService $productService
     * @return mixed
     */
    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * Get the products list
     *
     * @param Request $request
     * @return mixed
     */
    public function getProducts(Request $request)
    {
        $products = $this->productService->fetchAll();

        $carts = (array) $request->session()->get('carts');

        foreach ($products as $product) {
            foreach ($carts as $cart) {
                if ($product->id == $cart['id']) {
                    $product->quantity = $cart['quantity'];
                }
            }
        }

        return $products;
    }

    /**
     * Get commands
     *
     * @return mixed
     */
    public function getOrders()
    {
        $orders = $this->productService->getOrders();

        return $orders;
    }

    /**
     * Get the current cart
     *
     * @return mixed
     */
    public function getCurrentCarts(Request $request)
    {
        $carts = (array)  $request->session()->get('carts', []);

        $ids = [];
        foreach ($carts as $cart) {
            $ids[] = $cart['id'];
        }

        if (count($ids) > 0) {
            $products = $this->productService->fetchAll($ids);
        } else {
            $products = [];
        }

        foreach ($products as $product) {
            foreach ($carts as $cart) {
                if ($product->id == $cart['id']) {
                    $product->quantity = $cart['quantity'];
                }
            }
        }

        return $products;
    }

    /**
     * Push to cart
     *
     * @param Request $request
     * @return mixed
     */
    public function pushToCart(Request $request)
    {
        $carts = $request->get('carts');

        $request->session()->add('carts', $carts);

        return [
            "message" => 'OK',
            "status" => "success",
            "carts" => $carts
        ];
    }

    /**
     * Clear cart
     *
     * @param Request $request
     * @return mixed
     */
    public function clearCart(Request $request)
    {
        $request->session()->add('carts', []);

        return [
            "message" => "Ok",
            "success" => "success"
        ];
    }

    /**
     * Process Order
     *
     * @param Request $request
     * @param RadarPaymentServive $radarPaymentServive
     * @return mixed
     */
    public function processOrder(Request $request, RadarPaymentService $radarPaymentService)
    {
        $carts = $request->session()->get('carts', []);

        $order = $this->productService->createOrder($carts);

        $request->session()->add('carts', []);
        $order->where('id', $order->id)->update(['status' => 'pending']);

        $response = $radarPaymentService->register($order->id, $amount = $order->getAmounts());

        $order->order_id = $response['orderId'];
        $order->form_url = $response['formUrl'];

        $order->where('id', $order->id)->update(['order_id' => $response['orderId']]);

        return $order;
    }

    /**
     * Process payment callback
     *
     * @param Request $request
     * @return mixed
     */
    public function processPaymentCallback(Request $request)
    {

    }
}
