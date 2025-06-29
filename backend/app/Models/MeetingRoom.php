<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingRoom extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'capacity'];

    public function meetingRoom(){
        return $this->belongsTo(MeetingRoom::class);
    }
}
