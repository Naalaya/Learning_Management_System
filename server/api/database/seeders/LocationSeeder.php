<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \Eloquent::unguard();
        \DB::unprepared(file_get_contents(storage_path('app/private/database/provinces.sql')));

        $sqlDistrict        = file_get_contents(storage_path('app/private/database/districts.sql'));
        $statementDistrict  = array_filter(array_map('trim', explode(';', $sqlDistrict)));
        foreach ($statementDistrict as $district) {
            \DB::statement($district);
        }

        $sqlWard    = file_get_contents(storage_path('app/private/database/wards.sql'));
        $statements = array_filter(array_map('trim', explode(';', $sqlWard)));
        foreach ($statements as $ward) {
            \DB::statement($ward);
        }
    }
}
