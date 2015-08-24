<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Owner
 * @package App
 */
class Org extends Model{

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'orgs';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name','address','phone'];

	/**
	 * Property relationship
	 *
	 * Owner has many properties;
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function Owners(){

		return $this->hasMany('App\Models\Owners', 'id');

	}

}
