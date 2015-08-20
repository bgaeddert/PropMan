<?php namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Owner
 * @package App
 */
class Org extends Model{

	use SoftDeletes;

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
	protected $fillable = [];

	/**
	 * Property relationship
	 *
	 * Owner has many properties;
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function Owners(){

		return $this->hasMany('App\Owners', 'id');

	}

}
