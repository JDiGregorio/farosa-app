<?php

use Illuminate\Support\Facades\Route;

Route::resource('dashboard', DashboardController::class);
Route::resource('customer', CustomerController::class);
Route::resource('items', ItemController::class);
Route::resource('pedidos', TransactionHoldController::class);
Route::resource('user', UserController::class);