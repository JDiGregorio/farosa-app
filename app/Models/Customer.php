<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;

class Customer extends Model
{
    use HasFactory;
    use Filterable;

    protected $table = 'Customer';

    protected $primaryKey = 'ID';

    protected $appends = ['available'];

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = ['ID', 'FirstName', 'AccountNumber', 'AccountBalance', 'CreditLimit', 'CustomText1', 'CustomText2', 'SalesRepID'];

    /**
     * The attributes that should be visible for serialization.
     *
     * @var array
     */
    protected $visible = ['ID', 'FirstName', 'CustomText2', 'available'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [];

    private static $whiteListFilter = ['*'];

    public $timestamps = false;

    /*-------------------------------------------------------------------------
    | FUNCTIONS
    |------------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------
    | RELATIONS
    |------------------------------------------------------------------------*/

    public function saleRep()
	{
		return $this->belongsTo(SaleRep::class, 'SalesRepID');
	}
	
	public function transactionHolds()
	{
		return $this->hasMany(TransactionHold::class);
	}

    /*------------------------------------------------------------------------
    | SCOPES
	|-----------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------
	| ACCESORS
    |------------------------------------------------------------------------*/

    public function getAvailableAttribute()
	{
		return $this->CreditLimit - $this->AccountBalance;
	}

    /*-------------------------------------------------------------------------
    | MUTATORS
    |------------------------------------------------------------------------*/

}