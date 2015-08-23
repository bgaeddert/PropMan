<?php namespace App\Models;

use App\ModelScopes\ByOrgTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Owner
 * @package App
 */
class Owner extends Model{

	use SoftDeletes;
	use ByOrgTrait;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'owners';

	/**
	 * @var array
     */
	protected $dates = ['deleted_at'];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['org_id', 'owner_active', 'owner_name', 'owner_email', 'owner_address', 'owner_phone'];

	/**
	 * @var array
     */
	protected $guarded = ['id'];

	/**
	 * @var
     */
	protected $org_id;

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
	public function Org(){

		return $this->belongsTo('App\Models\Org');

	}

	/**
	 * Property relationship
	 *
	 * Owner has many properties;
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function Properties(){

		return $this->hasMany('App\Models\Property');

	}

	public function Units()
	{
		return $this->hasManyThrough('App\Models\Unit', 'App\Models\Property');
	}



	public function scopeOnlyActive($query)
	{
		return $query->where('owners.owner_active', '=', '1');
	}


}
