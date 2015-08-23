<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUnitsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('units', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('org_id')->unsigned();
			$table->foreign('org_id')->references('id')->on('orgs');

			$table->integer('property_id')->unsigned();
			$table->foreign('property_id')->references('id')->on('properties');

			$table->boolean('unit_active')->default(true);
			$table->string('unit_name');
			$table->longText('unit_address')->nullable();
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
		Schema::drop('units');
	}

}
