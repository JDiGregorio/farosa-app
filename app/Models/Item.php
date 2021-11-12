<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory;

    protected $table = 'Item';

    protected $primaryKey = 'ID';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = ['ID', 'Description', 'ItemLookupCode', 'Price', 'PriceA', 'PriceB', 'PriceC', 'Quantity'];

    /**
     * The attributes that should be visible for serialization.
     *
     * @var array
     */
    protected $visible = ['ID', 'Description', 'ItemLookupCode', 'Price', 'PriceA', 'PriceB', 'PriceC', 'Quantity'];

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

    public function transactionHoldEntries()
	{
		return $this->hasMany(TransactionHoldEntry::class, 'ItemID');
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