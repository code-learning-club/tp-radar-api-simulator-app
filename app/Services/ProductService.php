<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Order;
use App\Models\ProductOrder;

class ProductService
{
    /**
     * The instance of product
     *
     * @var Product
     */
    private $product;

    /**
     * The instance of order
     *
     * @var Order
     */
    private $order;

    /**
     * The instance of product items of order 
     *
     * @var ProductOrder
     */
    private $productOrder;

    /**
     * ProductService
     *
     * @param Product $product
     * @param Order $order
     * @param ProductOrder $productOrder
     * @return mixed
     */
    public function __construct(Product $product, Order $order, ProductOrder $productOrder)
    {
        $this->product = $product;
        $this->order = $order;
        $this->productOrder = $productOrder;
    }

    /**
     * Get the list of products
     *
     * @return array
     */
    public function fetchAll(array $ids = [])
    {
        if (count($ids) > 0) {
            return $this->product->whereIn('id', $ids)->get();
        }
        
        return $this->product->get();
    }

    /**
     * Get orders
     *
     * @return array
     */
    public function getOrders()
    {
        $orders = $this->order->get();

        foreach($orders as $order) {
            $order->products = $order->getProducts;
        }

        return $orders;
    }

    /**
     * Make order information
     *
     * @param array $carts
     * @return mixed
     */
    public function createOrder(array $carts)
    {
        $order = $this->order->where('status', 'pending')->first();

        if (is_null($order)) {
            $order = $this->order->create(['status' => 'waiting']);
        } else {
            $this->productOrder->where('order_id', $order->id)->delete();
        }

        foreach ($carts as $cart) {
            $this->productOrder->create([
                'product_id' => $cart['id'],
                'order_id' => $order->id,
                'quantity' => $cart['quantity'],
            ]);
        }

        return $order;
    }

    /**
     * Update order status
     *
     * @param int $order_id
     * @param array $data
     * @return mixed
     */
    public function updateOrder(int $order_id, array $data)
    {
        return $this->order->where('id', $order_id)->update($data);
    }
}
