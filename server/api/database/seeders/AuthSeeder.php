<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

// Models
use App\Models\Auth;

// Utils
use App\Utils\Consts;

class AuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        # 1 Admin
        $dataAuth = [
            'username'      => "admin@gmail.com",
            'password'      => Hash::make('123456'),
            'status'        => Consts::USER_STATUS_NORMAL,
            'created_at'    => $now,
            'updated_at'    => $now,
        ];
        Auth::insert($dataAuth);

        # 2 Teacher
        $dataAuth2Role = $dataAuth;
        $dataAuth2Role['username'] = 'ptmk27012';
        Auth::insert($dataAuth2Role);

        # 3 Student
        $dataAuth3Role = $dataAuth;
        $dataAuth3Role['username'] = 'student';
        Auth::insert($dataAuth3Role);
    }
}
