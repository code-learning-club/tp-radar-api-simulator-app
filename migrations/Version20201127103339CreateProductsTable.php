<?php

use Bow\Database\Migration\Migration;
use Bow\Database\Migration\SQLGenerator;

class Version20201127103339CreateProductsTable extends Migration
{
    /**
     * Up Migration
     */
    public function up()
    {
        $this->create("products", function (SQLGenerator $table) {
            $table->addIncrement("id");
            $table->addString("name");
            $table->addInteger("price");
            $table->addTimestamps();
        });
    }

    /**
     * Rollback migration
     */
    public function rollback()
    {
        $this->dropIfExists("table_name");
    }
}
