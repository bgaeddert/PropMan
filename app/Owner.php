<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Owner
 * @package App
 */
class Owner extends Model{

	use SoftDeletes;

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
	protected $fillable = ['name', 'email', 'address', 'phone'];

	/**
	 * Property relationship
	 *
	 * Owner has many properties;
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function Properties(){

		return $this->hasMany('App\Property', 'id');

	}

}
