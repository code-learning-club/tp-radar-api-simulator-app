<?php

namespace App\Models;

use Bow\Database\Barry\Model;

class Order extends Model
{
    /**
     * Get the order product list
     * 
     * @return array
     */
    public function getProducts()
    {
        return $this->hasMany(ProductOrder::class, 'order_id', 'id')
            ->join("products", "products.id", "product_orders.product_id");
    }

    /**
     * Get the order product list
     * 
     * @return array
     */
    public function getAmounts()
    {
        $query = $this->hasMany(ProductOrder::class, 'order_id', 'id')
            ->select(['sum(products.price * product_orders.quantity) as amount'])
            ->join("products", "products.id", "product_orders.product_id")
            ->first();

        return $query->amount ?? 0;
    }
}
