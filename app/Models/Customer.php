<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'Customer';

    protected $primaryKey = 'ID';

    protected $appends = ['disponible'];

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = ['ID', 'FirstName', 'AccountNumber', 'CustomText1', 'CustomText2', 'AccountBalance', 'CreditLimit', 'SalesRepID'];

    /**
     * The attributes that should be visible for serialization.
     *
     * @var array
     */
    protected $visible = ['ID', 'FirstName', 'CustomText2', 'disponible'];

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

    public function getDisponibleAttribute()
	{
		return $this->CreditLimit - $this->AccountBalance;
	}

    /*-------------------------------------------------------------------------
    | MUTATORS
    |------------------------------------------------------------------------*/

}