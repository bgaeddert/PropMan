<?php namespace App\Models;

use App\ModelScopes\ByOrgTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Owner
 * @package App
 */
class Property extends Model{

	use SoftDeletes;
	use ByOrgTrait;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'properties';

	/**
	 * @var array
     */
	protected $dates = ['deleted_at'];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['org_id', 'owner_id', 'property_active', 'property_name', 'property_address'];

	protected $guarded = ['id'];

	/**
	 * Owner relationship
	 *
	 * Property belong to an owner;
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
	public function Owner(){

		return $this->belongsTo('App\Models\Owner');

	}

	public function Units(){

		return $this->hasMany('App\Models\Unit');

	}

	public function scopeByOwner($query, $owner_id)
	{
		return $query->where('owner_id', '=', $owner_id);
	}

	public function scopeOnlyActive($query)
	{
		return $query->where('properties.property_active', '=', '1');
	}

}
