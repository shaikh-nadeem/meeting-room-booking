<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','name',
        'start_time',
        'duration','members','meeting_room_id'];

    public function meetingRoom(){
        return $this->belongsTo(MeetingRoom::class);
    }
}
