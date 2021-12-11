<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Resources\UserResource;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return new UserResource($request->user());
    });

    Route::get('/users/related-data', [App\Http\Controllers\UserController::class, 'getRelatedData']);
    Route::get('/transactions/related-data', [App\Http\Controllers\TransactionHoldController::class, 'getRelatedData']);

    Route::resource('customer', CustomerController::class);
    Route::resource('items', ItemController::class);
    Route::resource('transactions', TransactionHoldController::class);
    Route::resource('users', UserController::class);
});