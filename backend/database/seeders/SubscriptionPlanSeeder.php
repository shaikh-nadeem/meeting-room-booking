<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class SubscriptionPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('subscription_plans')->insert([
            ['name' => 'Free', 'daily_limit' => 3],
            ['name' => 'Basic', 'daily_limit' => 5],
            ['name' => 'Advance', 'daily_limit' => 7],
            ['name' => 'Premium', 'daily_limit' => 10],
        ]);
    }
}
