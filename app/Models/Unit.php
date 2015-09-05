<?php namespace App\Models;

use App\ModelScopes\ByOrgTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Owner
 * @package App
 */
class Unit extends Model{

	use SoftDeletes;
	use ByOrgTrait;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'units';

	/**
	 * @var array
     */
	protected $dates = ['deleted_at'];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['org_id', 'property_id', 'unit_active', 'unit_name', 'unit_address', 'note'];

	protected $guarded = ['id'];

	/**
	 * Owner relationship
	 *
	 * Property belong to an owner;
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
	public function Property(){

		return $this->belongsTo('App\Models\Property');

	}

	public function Tenants(){

		return $this->hasMany('App\Models\Tenant');

	}

	public function scopeByProperty($query, $property_id)
	{
		return $query->where('property_id', '=', $property_id);
	}

}
