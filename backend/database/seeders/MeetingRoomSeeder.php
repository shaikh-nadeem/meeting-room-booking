<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Carbon\Carbon;

class MeetingRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
        
        $now = Carbon::now();

        DB::table('meeting_rooms')->insert([
            ['name' => 'Meeting Room 1', 'capacity' => 3, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Meeting Room 2', 'capacity' => 10, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Meeting Room 3', 'capacity' => 15, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Meeting Room 4', 'capacity' => 2, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Meeting Room 5', 'capacity' => 1, 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
