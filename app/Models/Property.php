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
	protected $fillable = ['org_id', 'owner_id', 'property_active', 'property_name', 'property_address', 'note'];

	protected $guarded = ['id'];

	public function Org(){
		return $this->belongsTo('App\Models\Org');
	}

	public function Owner(){

		return $this->belongsTo('App\Models\Owner');

	}

	public function Units(){

		return $this->hasMany('App\Models\Unit');

	}

	public function Transactions(){

		return $this->hasMany('App\Models\Transaction');

	}

	public function scopeByOwner($query, $owner_id)
	{
		return $query->where('owner_id', '=', $owner_id);
	}

	public function scopeOnlyActive($query)
	{
		return $query->where('properties.property_active', '=', '1');
	}

	public function allTransactions(){

		$transactions = Transaction::select([
			'transactions.*',
			'orgs.name as org_name',
			'property_name',
			'tenant_name',
			\DB::raw("
				if(
					transactions.note IS NULL OR transactions.note = '',
					if(	transactions.payer = 'tenant_id',
						concat('Alquiler ',units.unit_name),
						'--'
					),
					transactions.note
				) as detail"
			)
			] )
			->leftJoin( 'orgs', 'orgs.id', '=', 'transactions.org_id' )
			->leftJoin( 'properties', 'properties.id', '=', 'transactions.property_id' )
			->leftJoin( 'tenants', 'tenants.id', '=', 'transactions.tenant_id' )
			->leftJoin( 'units', 'units.id', '=', 'tenants.unit_id' )
			->where( 'transactions.property_id', $this->id )
			->orderBy('paid_at')
			->get();

		return $transactions;

	}
}
