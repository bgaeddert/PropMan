<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTenantsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tenants', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('org_id')->unsigned();
			$table->foreign('org_id')->references('id')->on('orgs');

			$table->integer('unit_id')->unsigned();
			$table->foreign('unit_id')->references('id')->on('units');

			$table->boolean('tenant_active')->default(true);
			$table->string('tenant_name');
			$table->string('tenant_phone')->nullable();
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
		Schema::drop('tenants');
	}

}
