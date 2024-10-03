<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use App\Models\{
    Province,
    District,
    Ward
};

class Location extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:location';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $client = new Client([
                'headers' => ['Content-Type' => 'application/json', 'token' => 'd53afbd0-f0b2-11ea-84ad-96345611fc28']
            ]);
            $response_provide = $client->post('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', [
                'body' => json_encode([])
            ]);
            $records_provide = json_decode($response_provide->getBody()->getContents());
            \DB::beginTransaction();
            if ($records_provide->code == 200) {
                if (!empty($records_provide->data)) {
                    foreach ($records_provide->data as $value) {
                        $province       = new Province();
                        $province->name = $value->ProvinceName;
                        $province->save();

                        $response_district = $client->get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id='.(int)$value->ProvinceID, [
                            'body' => json_encode([
                                'province_id' => (int)$value->ProvinceID
                            ])
                        ]);
                        $records_district = json_decode($response_district->getBody()->getContents());
                        if ($records_district->code == 200) {
                            if (!empty($records_district->data)) {
                                foreach ($records_district->data as $value_district) {
                                    $district               = new District();
                                    $district->name         = $value_district->DistrictName;
                                    $district->province_id  = $province->id;
                                    $district->save();

                                    $response_ward = $client->get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=' . (int)$value_district->DistrictID, [
                                        'body' => json_encode([
                                            'district_id' => (int)$value_district->DistrictID
                                        ])
                                    ]);
                                    $records_ward = json_decode($response_ward->getBody()->getContents());
                                    if ($records_ward->code == 200) {
                                        if (!empty($records_ward->data)) {
                                            foreach ($records_ward->data as $value_ward) {
                                                $ward               = new Ward();
                                                $ward->name         = $value_ward->WardName;
                                                $ward->district_id  = $district->id;
                                                $ward->save();
                                            }
                                        }
                                    } else {
                                        throw new \Exception("Error Processing Request", 1);
                                    }
                                }
                            }
                        } else {
                            throw new \Exception("Error Processing Request", 1);
                        }
                    }
                }
            } else {
                throw new \Exception("Error Processing Request", 1);
            }

            print("Dữ liệu location nhập thành công!");
            \DB::commit();
        } catch (\Exception $e) {
            \DB::rollBack();
            dd($e->getMessage());
        }
    }
}
