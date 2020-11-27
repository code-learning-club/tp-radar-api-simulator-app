<?php

use Bow\Database\Migration\Migration;
use Bow\Database\Migration\SQLGenerator;

class Version20201127103614CreateOrdersTable extends Migration
{
    /**
     * Up Migration
     */
    public function up()
    {
        $this->create("orders", function (SQLGenerator $table) {
            $table->addString('id');
            $table->addString('order_id', ['size' => 255, 'nullable' => true]);
            $table->addString('status', ['default' => 'pending']);
            $table->addTimestamps();
        });
    }

    /**
     * Rollback migration
     */
    public function rollback()
    {
        $this->dropIfExists("orders");
    }
}
