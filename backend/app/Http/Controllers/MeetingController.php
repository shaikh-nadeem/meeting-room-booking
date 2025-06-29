<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Meeting;
use App\Models\MeetingRoom;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
 
class MeetingController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'start_time' => 'required|date|after:now',
            'duration' => 'required|in:30,60,90',
            'members' => 'required|integer|min:1',
            'meeting_room_id' => 'required|exists:meeting_rooms,id',
        ]);

        // Enforce booking limit: Free Plan = 3/day 
        $user = $request->user();
        $today = now()->startOfDay();
        $countToday = Meeting::where('user_id', $user->id)
            ->whereDate('start_time', $today)
            ->count();

        if ($countToday >= 3) {
            return response()->json(['message' => 'Booking limit reached (3/day)'], 403);
        }

        $meeting = Meeting::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'start_time' => Carbon::parse($request->start_time),
            'duration' => $request->duration,
            'members' => $request->members,
            'meeting_room_id' => $request->meeting_room_id,
        ]);

        return response()->json(['message' => 'Meeting booked', 'meeting' => $meeting]);
    }

    public function getAvailableRooms(Request $request){
        $request->validate([
            'start_time' => 'required|date|after:now',
            'duration' => 'required|in:30,60,90',
            'members' => 'required|integer|min:1',
        ]);

        $start = Carbon::parse($request->start_time);
        $end = $start->copy()->addMinutes($request->duration);

        $conflicts = Meeting::where(function ($query) use ($start, $end) {
            $query->whereBetween('start_time', [$start, $end])
                ->orWhereRaw('? BETWEEN start_time AND DATE_ADD(start_time, INTERVAL duration MINUTE)', [$start]);
        })->pluck('meeting_room_id');

        $rooms = MeetingRoom::where('capacity', '>=', $request->members)
                            ->whereNotIn('id', $conflicts)
                            ->get();

        return response()->json($rooms);
    }

    public function myMeetings(Request $request){
        $user = $request->user();
        $filter = $request->query('filter', 'upcoming');

        $query = Meeting::with('meetingRoom')
            ->where('user_id', $user->id);

        if ($filter === 'past') {
            $query->where('start_time', '<', Carbon::now());
        } else {
            $query->where('start_time', '>=', Carbon::now());
        }

        return $query->orderBy('start_time')->paginate(5);
    }
}
