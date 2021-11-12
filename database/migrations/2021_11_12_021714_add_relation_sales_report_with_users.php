<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelationSalesReportWithUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('enter_price')->after('password')->default(false);
            $table->unsignedInteger('SalesRep_id')->after('enter_price')->nullable();

            $table->foreign('SalesRep_id')->references('ID')->on('SalesRep');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('enter_price');
            $table->dropForeign(['SalesRep_id']);
            $table->dropColumn('SalesRep_id');
        });
    }
}
