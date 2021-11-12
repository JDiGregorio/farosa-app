<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\TransactionHoldEntry;

class TransactionHoldEntryController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->authorizeResource(TransactionHoldEntry::class, 'entry');
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
     * @param  \App\Models\TransactionHoldEntry  $transactionHoldEntry
     * @return \Illuminate\Http\Response
     */
    public function edit(TransactionHoldEntry $transactionHoldEntry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TransactionHoldEntry  $transactionHoldEntry
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TransactionHoldEntry $transactionHoldEntry)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TransactionHoldEntry  $transactionHoldEntry
     * @return \Illuminate\Http\Response
     */
    public function show(TransactionHoldEntry $transactionHoldEntry)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TransactionHoldEntry  $transactionHoldEntry
     * @return \Illuminate\Http\Response
     */
    public function destroy(TransactionHoldEntry $transactionHoldEntry)
    {
        //
    }
}