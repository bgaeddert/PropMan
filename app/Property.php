<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Owner
 * @package App
 */
class Property extends Model{

	use SoftDeletes;

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
	protected $fillable = ['owner_id', 'property_name', 'property_address'];

	/**
	 * Owner relationship
	 *
	 * Property belong to an owner;
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
	public function Owner(){

		return $this->belongsTo('App\Owner', 'owner_id');

	}

}
