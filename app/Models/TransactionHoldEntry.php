<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class TransactionHoldEntry extends Model
{
    use HasFactory;

    protected $table = 'TransactionHoldEntry';

    protected $primaryKey = 'ID';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'ID', 'TransactionHoldID', 'Description', 'QuantityPurchased', 'Price', 'FullPrice', 'Taxable', 'ItemID',
		'EntryKey', 'StoreID', 'RecallID', 'QuantityOnOrder', 'QuantityRTD', 'QuantityReserved', 'PriceSource',
		'Comment', 'DetailID', 'SalesRepID', 'SerialNumber1', 'SerialNumber2', 'SerialNumber3', 'VoucherNumber',
		'VoucherExpirationDate', 'DBTimeStamp', 'DiscountReasonCodeID', 'ReturnReasonCodeID', 'TaxChangeReasonCodeID',
		'ItemTaxID', 'ComponentQuantityReserved', 'TransactionTime', 'IsAddMoney', 'VoucherID'
    ];

    /**
     * The attributes that should be visible for serialization.
     *
     * @var array
     */
    protected $visible = ['ID', 'TransactionHoldID', 'Description', 'QuantityPurchased', 'Price', 'ItemID', 'SalesRepID', 'TransactionTime'];

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

    protected static function booted()
	{
        self::creating(function($model)
		{
			$default_expiration_date = Carbon::create(1899, 12, 30)->toDateTimeLocalString();
			$default_transaction_date = Carbon::now();
			$default_transaction_date_string = $default_transaction_date->toDateTimeLocalString() . "." . substr($default_transaction_date->format("u"), 0, 3);
			
			$model->VoucherExpirationDate = $default_expiration_date;
			$model->TransactionTime = str_replace(" ", "T", $model->transactionhold()->get()->first()->TransactionTime);
        });
    }

    /*-------------------------------------------------------------------------
    | RELATIONS
    |------------------------------------------------------------------------*/

    public function transactionHold()
	{
		return $this->belongsTo(TransactionHold::class, 'TransactionHoldID');
	}
	
	public function item()
	{
		return $this->belongsTo(Item::class, 'ItemID');
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