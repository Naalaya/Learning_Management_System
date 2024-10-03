<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;

// Models
use App\Models\AuthRole;
use App\Utils\Consts;

class AuthRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        $dataUserRole = [];

        # 1
        $dataUserRole[] = [
            'auth_id'    => 1,
            'role_id'    => Consts::AUTH_ROLE_ADMIN,
            'created_at' => $now,
            'updated_at' => $now
        ];

        # 2
        $dataUserRole[] = [
            'auth_id'    => 2,
            'role_id'    => Consts::AUTH_ROLE_TEACHER,
            'created_at' => $now,
            'updated_at' => $now
        ];
        # 3
        $dataUserRole[] = [
            'auth_id'=> 3,
            'role_id'=> Consts::AUTH_ROLE_STUDENT,
            'created_at'=> $now,
            'updated_at'=> $now
        ];
        AuthRole::insert($dataUserRole);
    }
}
