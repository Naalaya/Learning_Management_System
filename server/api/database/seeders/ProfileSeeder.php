<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;

// Models
use App\Models\{
    Profile
};

class ProfileSeeder extends Seeder
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
        $dataProfile = [
            'name'          => 'Lê Thị Lợi',
            'profile_id'    => fake()->numerify('##########'),
            'avatar'        => null,
            'gender'        => rand(1, 2),
            'birthday'      => fake()->dateTimeBetween('1980-01-01', '2000-12-31'),
            'address'       => 'R4-10 Hưng Gia 1, Đường số 2, Phú Mỹ Hưng',
            'ward_id'       => $wardId,
            'district_id'   => $districtId,
            'province_id'   => $provinceId,
            'created_at'    => $now,
            'updated_at'    => $now,
        ];

        # 1
        $dataProfile['auth_id'] = 1;
        $dataProfile['name']    = 'Lê Vũ Đức Ân';
        $dataProfile['phone']   = '0909090909';
        $dataProfile['email']   = fake()->safeEmail();
        $dataProfile['profile_id']   = fake()->numerify('##########');
        Profile::insert($dataProfile);

        # 2
        $dataProfile['auth_id'] = 2;
        $dataProfile['name']    = 'Phan Trần Minh Khuê';
        $dataProfile['phone']   = '0909090903';
        $dataProfile['email']   = fake()->safeEmail();
        $dataProfile['profile_id']   = fake()->numerify('##########');
        Profile::insert($dataProfile);
        # 3
        $dataProfile['auth_id'] = 3;
        $dataProfile['name']    = 'Nguyễn Văn Sơn';
        $dataProfile['phone']   = '0909090902';
        $dataProfile['email']   = fake()->safeEmail();
        $dataProfile['profile_id']   = fake()->numerify('##########');
        Profile::insert($dataProfile);
    }
}
