<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSubscription extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'subscription_plan_id'];

    public function subscriptionPlan(){
        return $this->belongsTo(SubscriptionPlan::class);
    }

}
