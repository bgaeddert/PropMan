<?php namespace App\Models;

use App\ModelScopes\ByOrgTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use DateTime;

/**
 * Class Owner
 * @package App
 */
class Transaction extends Model{

	use SoftDeletes;
	use ByOrgTrait;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'transactions';

	/**
	 * @var array
     */
	protected $dates = ['deleted_at'];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'org_id',
		'property_id',
		'tenant_id',
		'outside_name',
		'payer',
		'payee',
		'colones',
		'dollars',
		'note',
		'paid_at',
		'trans_num',
		'tipo',
	];

	protected $guarded = ['id'];

	/* RELATIONSHIPS */

	public function Org(){
		return $this->belongsTo('App\Models\Org');
	}

	public function Tenant(){
		return $this->belongsTo('App\Models\Tenant');
	}

	public function Property(){
		return $this->belongsTo('App\Models\Property');
	}

	/* SCOPES */

	public function scopeByProperty($query, $property_id)
	{
		return $query->where('property_id', '=', $property_id);
	}

	public function scopeByTenant($query, $tenant_id)
	{
		return $query->where('tenant_id', '=', $tenant_id);
	}

	/* ACCESSORS - MUTATERS */

	public function getPaidAtAttribute($value)
	{
		return Carbon::parse($value)->timestamp;
	}

}
