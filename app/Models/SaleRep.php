<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SaleRep extends Model
{
    use HasFactory;

    protected $table = 'SalesRep';

    protected $primaryKey = 'ID';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = ['ID', 'Name'];

    /**
     * The attributes that should be visible for serialization.
     *
     * @var array
     */
    protected $visible = [];

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

    public function customers()
	{
		return $this->hasMany(Customer::class);
	}
	
	public function transactionHolds()
	{
		return $this->hasMany(TransactionHold::class);
	}
	
	public function users()
	{
		return $this->hasMany(User::class);
	}

    /*------------------------------------------------------------------------
    | SCOPES
	|-----------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------
	| ACCESORS
    |------------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------
    | MUTATORS
    |------------------------------------------------------------------------*/

}