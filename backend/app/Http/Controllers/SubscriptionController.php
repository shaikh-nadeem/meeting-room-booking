<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;

class SubscriptionController extends Controller
{
    public function plans(){
        return SubscriptionPlan::all();
    }

    public function subscribe(Request $request){
        $request->validate([
            'subscription_plan_id' => 'required|exists:subscription_plans,id',
        ]);

        $user = $request->user();

        UserSubscription::updateOrCreate(
            ['user_id' => $user->id],
            ['subscription_plan_id' => $request->subscription_plan_id]
        );

        return response()->json(['message' => 'Subscription updated']);
    }

    public function mySubscription(Request $request){
        $sub = UserSubscription::with('subscriptionPlan')->where('user_id', $request->user()->id)->first();

        return response()->json($sub);
    }
}
