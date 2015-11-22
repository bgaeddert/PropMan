<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCascadeDeletes extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('properties', function (Blueprint $table) {
			$table->dropForeign('properties_owner_id_foreign');
			$table->foreign('owner_id')
				->references('id')->on('owners')
				->onDelete('cascade')
				->change();
		});

		Schema::table('units', function (Blueprint $table) {
			$table->dropForeign('units_property_id_foreign');
			$table->foreign('property_id')
				->references('id')->on('properties')
				->onDelete('cascade')
				->change();
		});

		Schema::table('tenants', function (Blueprint $table) {
			$table->dropForeign('tenants_unit_id_foreign');
			$table->foreign('unit_id')
				->references('id')->on('units')
				->onDelete('cascade')
				->change();
		});

		Schema::table('transactions', function (Blueprint $table) {
			$table->dropForeign('transactions_property_id_foreign');
			$table->dropForeign('transactions_tenant_id_foreign');
			$table->foreign('property_id')
				->references('id')->on('properties')
				->onDelete('cascade')
				->change();
			$table->foreign('tenant_id')
				->references('id')->on('tenants')
				->onDelete('cascade')
				->change();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
