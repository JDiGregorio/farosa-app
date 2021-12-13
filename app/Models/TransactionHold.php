<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;

use App\Scopes\TransactionHoldScope;

class TransactionHold extends Model
{
    use HasFactory;
	use Filterable;

    protected $table = 'TransactionHold';

    protected $primaryKey = 'ID';

    protected $appends = ['products'];

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'StoreID', 'TransactionType', 'HoldComment', 'RecallID', 'Comment', 'PriceLevel',					   
        'DiscountMethod', 'DiscountPercent', 'Taxable', 'CustomerID', 'DeltaDeposit',
        'DepositOverride', 'DepositPrevious', 'PaymentsPrevious', 'TaxPrevious', 'SalesRepID',
        'ShipToID', 'ExpirationOrDueDate', 'ReturnMode', 'ReferenceNumber',
        'ShippingChargePurchased', 'ShippingChargeOverride', 'ShippingServiceID',
        'ShippingTrackingNumber', 'ShippingNotes', 'DBTimeStamp', 'ReasonCodeID',
        'ExchangeID', 'ChannelType', 'DefaultDiscountReasonCodeID',
        'DefaultReturnReasonCodeID', 'DefaultTaxChangeReasonCodeID', 'BatchNumber'
    ];

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
    protected $hidden = ['DBTimeStamp'];

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

    protected static function booted()
	{
		static::addGlobalScope(new TransactionHoldScope);

		self::creating(function($model) {
			$default_cero = 0;
			$default_uno = 1;
			$default_dos = 2;
			$default_tres = 3;
			$default_verdadero = 1;
			$default_falso = 0;
			$default_vacio = "N/A";
			
			$model->StoreID = $default_cero;
			$model->TransactionType = $default_uno;
			$model->RecallID = $default_cero;
			$model->Comment = $default_vacio;
			$model->PriceLevel = $default_cero;		
			$model->DiscountMethod = $default_dos;		
			$model->DiscountPercent = $default_cero;		
			$model->Taxable = $default_verdadero;		
			$model->DeltaDeposit = $default_cero;		
			$model->DepositOverride = $default_falso;		
			$model->DepositPrevious = $default_cero;		
			$model->PaymentsPrevious = $default_cero;		
			$model->TaxPrevious = $default_cero;		
			$model->ShipToID = $default_cero;		
			$model->ExpirationOrDueDate = $default_cero;		
			$model->ReturnMode = $default_falso;		
			$model->ReferenceNumber = $default_vacio;		
			$model->ShippingChargePurchased = $default_cero;		
			$model->ShippingChargeOverride = $default_falso;		
			$model->ShippingServiceID = $default_cero;		
			$model->ShippingTrackingNumber = $default_vacio;		
			$model->ShippingNotes = $default_vacio;		
			$model->ReasonCodeID = $default_cero;		
			$model->ExchangeID = $default_cero;		
			$model->ChannelType = $default_cero;		
			$model->DefaultDiscountReasonCodeID = $default_cero;		
			$model->DefaultReturnReasonCodeID = $default_cero;		
			$model->DefaultTaxChangeReasonCodeID = $default_cero;		
			$model->BatchNumber = $default_tres;
        });

        /*self::updating(function($model)
		{
			$default_cero = 0;
			$default_uno = 1;
			$default_dos = 2;
			$default_tres = 3;
			$default_verdadero = 1;
			$default_falso = 0;

			$model->StoreID = $default_cero;
			$model->TransactionType = $default_uno;
			$model->RecallID = $default_cero;
			$model->PriceLevel = $default_cero;		
			$model->DiscountMethod = $default_dos;		
			$model->DiscountPercent = $default_cero;		
			$model->Taxable = $default_verdadero;		
			$model->DeltaDeposit = $default_cero;		
			$model->DepositOverride = $default_falso;		
			$model->DepositPrevious = $default_cero;		
			$model->PaymentsPrevious = $default_cero;		
			$model->TaxPrevious = $default_cero;		
			$model->ShipToID = $default_cero;		
			$model->ExpirationOrDueDate = $default_cero;		
			$model->ReturnMode = $default_falso;		
			$model->ShippingChargePurchased = $default_cero;		
			$model->ShippingChargeOverride = $default_falso;		
			$model->ShippingServiceID = $default_cero;		
			$model->ReasonCodeID = $default_cero;		
			$model->ExchangeID = $default_cero;		
			$model->ChannelType = $default_cero;		
			$model->DefaultDiscountReasonCodeID = $default_cero;		
			$model->DefaultReturnReasonCodeID = $default_cero;		
			$model->DefaultTaxChangeReasonCodeID = $default_cero;		
			$model->BatchNumber = $default_tres;
		});*/

        self::deleting(function($model)
		{
            $model->transactionHoldEntries()->delete();
        });
	}

    /*-------------------------------------------------------------------------
    | RELATIONS
    |------------------------------------------------------------------------*/

    public function transactionHoldEntries()
	{
		return $this->hasMany(TransactionHoldEntry::class, 'ItemID');
	}

	public function customer()
	{
		return $this->belongsTo(Customer::class, 'CustomerID');
	}

    /*------------------------------------------------------------------------
    | SCOPES
	|-----------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------
	| ACCESORS
    |------------------------------------------------------------------------*/

	public function getProductsAttribute()
	{
		return $this->transactionHoldEntries()->get();
	}

    /*-------------------------------------------------------------------------
    | MUTATORS
    |------------------------------------------------------------------------*/

}