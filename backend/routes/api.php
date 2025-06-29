<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\SubscriptionController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
Route::middleware('auth:sanctum')->group(function () {
    //return $request->user();
    Route::get('/me',     [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::post('/meetings', [MeetingController::class, 'store']);
    Route::post('/available-rooms', [MeetingController::class, 'getAvailableRooms']);

    Route::get('/plans', [SubscriptionController::class, 'plans']);
    Route::post('/subscribe', [SubscriptionController::class, 'subscribe']);
    Route::get('/my-subscription', [SubscriptionController::class, 'mySubscription']);
    Route::get('/my-meetings', [MeetingController::class, 'myMeetings']);

});