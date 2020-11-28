<?php

use Bow\Database\Migration\Migration;
use Bow\Database\Migration\SQLGenerator;

class Version20201127104213CreateProductOrdersTable extends Migration
{
    /**
     * Up Migration
     */
    public function up()
    {
        $this->create("product_orders", function (SQLGenerator $table) {
            $table->addIncrement('id');
            $table->addInteger('product_id');
            $table->addInteger('order_id');
            $table->addInteger('quantity');
            $table->addTimestamps();
        });
    }

    /**
     * Rollback migration
     */
    public function rollback()
    {
        $this->dropIfExists("product_orders");
    }
}
