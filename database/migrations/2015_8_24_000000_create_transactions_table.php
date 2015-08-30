<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transactions', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('org_id')->unsigned();
			$table->foreign('org_id')->references('id')->on('orgs');

			$table->integer('property_id')->unsigned()->nullable();
			$table->foreign('property_id')->references('id')->on('properties');

			$table->integer('tenant_id')->unsigned()->nullable();
			$table->foreign('tenant_id')->references('id')->on('tenants');

			$table->longText('outside_name')->nullable();

			$table->enum('payer', ['org_id','tenant_id', 'property_id', 'outside_name']);
			$table->enum('payee', ['org_id','tenant_id', 'property_id', 'outside_name']);

			$table->double('colones', 20, 2)->nullable();
			$table->double('dollars', 20, 2)->nullable();

			$table->longText('note')->nullable();


			$table->timestamp('paid_at');

			$table->timestamps();
			$table->softDeletes();

		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('transactions');
	}

}
