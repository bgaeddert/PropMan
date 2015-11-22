<?php namespace App\Models;

use App\ModelScopes\ByOrgTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Owner
 * @package App
 */
class Tenant extends Model{

	use SoftDeletes;
	use ByOrgTrait;

	protected static function boot() {
		parent::boot();

		static::deleting(function($tenant) {

			foreach ($tenant->Transactions as $transaction) {
				$transaction->delete();
			}
		});
	}

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'tenants';

	/**
	 * @var array
     */
	protected $dates = ['deleted_at'];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['org_id', 'unit_id', 'tenant_active', 'tenant_name', 'tenant_phone', 'note'];

	protected $guarded = ['id'];

	public function Org(){
		return $this->belongsTo('App\Models\Org');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
	public function Unit(){

		return $this->belongsTo('App\Models\Unit');

	}

	public function Transactions(){

		return $this->hasMany('App\Models\Transaction');

	}

	public function scopeByUnit($query, $unit_id)
	{
		return $query->where('unit_id', '=', $unit_id);
	}

}
