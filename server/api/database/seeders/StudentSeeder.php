<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;
use Carbon\Carbon;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        $provinceId = 62;
        $districtId = 682;
        $wardId     = 10923;
        for ($i = 1; $i <= 30; $i++) {
            $code = fake()->numerify('#####');
            $dataStudent = [
                'teacher_id'    => 1,
                'code'          => "AC{$code}",
                'password'      => bcrypt("AC{$code}"),
                'name'          => fake('vi_VN')->firstName() . ' ' . fake('vi_VN')->lastName(),
                'profile_id'    =>fake()->numerify('############'),
                'email'         => fake()->safeEmail(),
                'phone'         => fake()->numerify('09########'),
                'avatar'        => $i == 1 || $i == 2 ? 'images/avatar/student-2.png' : null,
                'gender'        => rand(1, 2),
                'birthday'      => fake()->dateTimeBetween('-18 years', '-6 years'),
                'joined_date'   => fake()->dateTimeBetween('-2 years'),
                'address'       => 'R4-10 Hưng Gia 1, Đường số 2, Phú Mỹ Hưng',
                'ward_id'       => $wardId,
                'district_id'   => $districtId,
                'province_id'   => $provinceId,
                'classify'      => 1,
                'created_at'    => $now,
                'updated_at'    => $now,
            ];
            Student::create($dataStudent);
        }
    }
}
