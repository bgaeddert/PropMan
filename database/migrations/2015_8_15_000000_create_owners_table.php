<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOwnersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('owners', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('org_id')->unsigned();
			$table->foreign('org_id')->references('id')->on('orgs');

			$table->boolean('owner_active')->default(true);
			$table->string('owner_name');
			$table->string('owner_email')->nullable();
			$table->longText('owner_address')->nullable();
			$table->string('owner_phone')->nullable();
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
		Schema::drop('owners');
	}

}
