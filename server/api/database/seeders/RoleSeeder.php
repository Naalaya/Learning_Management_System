<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;

// Models
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::insert([
            [
                'name'       => 'admin',
                'media'      => '/assets/images/roles/admin.png',
            ],
            [
                'name'       => 'Giáo viên',
                'media'      => '/assets/images/roles/teacher.png',
            ],
            [
                'name'       => 'Học sinh',
                'media'      => '/assets/images/roles/student.png',
            ],
        ]);
    }
}
