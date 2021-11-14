<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return new UserResource($request->user());
});



Route::resource('dashboard', 'App\Http\Controllers\DashboardController');
Route::resource('customer', "App\Http\Controllers\CustomerController");
Route::resource('items', "App\Http\Controllers\ItemController");
Route::resource('pedidos', "App\Http\Controllers\TransactionHoldController");
Route::resource('users', "App\Http\Controllers\UserController");
