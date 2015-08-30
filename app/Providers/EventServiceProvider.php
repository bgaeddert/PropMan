<?php namespace App\Providers;

use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider {

	/**
	 * The event handler mappings for the application.
	 *
	 * @var array
	 */
	protected $listen = [
		'event.name' => [
			'EventListener',
		],
	];

	/**
	 * Register any other events for your application.
	 *
	 * @param  \Illuminate\Contracts\Events\Dispatcher  $events
	 * @return void
	 */
	public function boot(DispatcherContract $events)
	{
		parent::boot($events);

		\App\Models\Owner::saving(function($owner)
		{
			if(empty($owner->owner_name))
				$owner->owner_name = null;

			$owner->org_id = \Auth::User()->org_id;

			return $owner;
		});

		\App\Models\Property::saving(function($property)
		{
			if(empty($property->property_name))
				$property->property_name = null;

			$property->org_id = \Auth::User()->org_id;

			return $property;
		});

		\App\Models\Unit::saving(function($unit)
		{
			if(empty($unit->unit_name))
				$unit->unit_name = null;

			$unit->org_id = \Auth::User()->org_id;

			return $unit;
		});

		\App\Models\Tenant::saving(function($tenant)
		{
			if(empty($tenant->tenant_name))
				$tenant->tenant_name = null;

			$tenant->org_id = \Auth::User()->org_id;

			return $tenant;
		});

		\App\Models\Transaction::saving(function($transaction)
		{
			$transaction->org_id = \Auth::User()->org_id;

			return $transaction;
		});
	}

}
