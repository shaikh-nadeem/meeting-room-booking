<?php

namespace App\Http\Controllers;

use Str;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User registered successfully']);
    }

    public function login(Request $request) {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $this->ensureIsNotRateLimited($request);
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            RateLimiter::hit($this->throttleKey($request), 86400); // 24 hours in seconds
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
            // return response()->json(['message' => 'Invalid credentials'], 401);
        }

        RateLimiter::clear($this->throttleKey($request));
        $token = $user->createToken('token')->plainTextToken;

        return response()->json(['token' => $token,'user'  => $user]);
    }

    protected function ensureIsNotRateLimited(Request $request){
        if (RateLimiter::tooManyAttempts($this->throttleKey($request), 3)) {
            throw ValidationException::withMessages([
                'email' => ['Too many login attempts. Try again in 24 hours.'],
            ]);
        }
    }

    public function throttleKey(Request $request){
        return Str::lower($request->email) . '|' . $request->ip();
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request) {
        return response()->json($request->user());
    }
}
