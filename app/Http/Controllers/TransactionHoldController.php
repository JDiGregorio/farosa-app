<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\TransactionHold;
use App\Models\Customer;

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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TransactionHold  $transactionHold
     * @return \Illuminate\Http\Response
     */
    public function show(TransactionHold $transactionHold)
    {
        return new TransactionHoldShowResource($transactionHold);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TransactionHold  $transactionHold
     * @return \Illuminate\Http\Response
     */
    public function destroy(TransactionHold $transactionHold)
    {
        $transactionHold->delete();
    }

    public function getRelatedData(Request $request)
    {
        $response = [
            'customers' => Customer::all()->map(function($item) {
                return [
                    'value' => $item->ID,
                    'label' => $item->FirstName,
                    'available' => $item->available
                ];
            })
        ];

        return $response;
    }
}