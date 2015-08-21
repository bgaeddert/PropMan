<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePropertiesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('properties', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('org_id')->unsigned();
			$table->foreign('org_id')->references('id')->on('orgs');

			$table->integer('owner_id')->unsigned();
			$table->foreign('owner_id')->references('id')->on('owners');

			$table->boolean('property_active')->default(true);
			$table->string('property_name');
			$table->longText('property_address')->nullable();
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
		Schema::drop('properties');
	}

}
