<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\TransactionHold;
use App\Models\Customer;
use App\Models\Item;

use App\Http\Resources\Transactions\TransactionHoldIndexResource;
use App\Http\Resources\Transactions\TransactionHoldShowResource;

class TransactionHoldController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return  TransactionHoldIndexResource::collection(TransactionHold::filter(request()->all())->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $entries = collect($request->all())->except(['products'])->all();

        $order = TransactionHold::create($entries);

        if (isset($request->products)) {
            $products = json_decode($request->products[0]);

            if (isset($products) && count($products) > 0) {
                foreach ($products as $product) {
                    $order->transactionHoldEntries()->create([
                        'TransactionHoldID' => $order->ID,
                        'Description' => $product->Description,
                        'QuantityPurchased' => $product->QuantityPurchased,
                        'Price' => $product->Price,
                        'FullPrice' => $product->Price,
                        'Taxable' => false,
                        'ItemID' => $product->ID,
                        'SalesRepID' => $order->SalesRepID
                    ]);
                }
            }
        }

        return response()->json(['orderId' => $order->ID]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TransactionHold  $transactionHold
     * @return \Illuminate\Http\Response
     */
    public function show(TransactionHold $transaction)
    {
        return new TransactionHoldShowResource($transaction);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TransactionHold  $transactionHold
     * @return \Illuminate\Http\Response
     */
    public function destroy(TransactionHold $transaction)
    {
        return $transaction->delete();
    }

    public function getRelatedData(Request $request)
    {
        $user = auth()->user();

        if ($user->type_user) {
            $customers = Customer::all();
        } else {
            $customers = Customer::where('SalesRepID',  $user->SalesRep_id)->get();
        }

        $response = [
            'customers' => $customers->map(function($item) {
                return [
                    'value' => $item->ID,
                    'label' => $item->FirstName,
                    'available' => $item->available,
                    'customText2' => $item->CustomText2
                ];
            }),
            'products' => Item::all()->map(function($item) {
                return [
                    'ID' => $item->ID,
                    'Description' => $item->Description,
                    'ItemLookupCode' => $item->ItemLookupCode,
                    'Price' => (float)number_format($item->Price, 2, '.', ''),
                    'PriceA' => (float)number_format($item->PriceA, 2, '.', ''),
                    'PriceB' => (float)number_format($item->PriceB, 2, '.', ''),
                    'PriceC' => (float)number_format($item->PriceC, 2, '.', ''),
                    'Quantity' => (float)$item->Quantity
                ];
            }),
            'SalesRepID' => $user->SalesRep_id,
            'enterPrice' => boolval($user->enter_price)
        ];

        return $response;
    }
}