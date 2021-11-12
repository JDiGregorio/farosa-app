<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\TransactionHold;

class TransactionHoldController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->authorizeResource(TransactionHold::class, 'hold');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TransactionHold  $transactionHold
     * @return \Illuminate\Http\Response
     */
    public function edit(TransactionHold $transactionHold)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TransactionHold  $transactionHold
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TransactionHold $transactionHold)
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TransactionHold  $transactionHold
     * @return \Illuminate\Http\Response
     */
    public function destroy(TransactionHold $transactionHold)
    {
        //
    }
}