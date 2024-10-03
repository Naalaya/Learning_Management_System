<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

// Resources
use App\Http\Resources\Location\LocationResource;

// Models
use App\Models\{
    District,
    Province,
    Ward
};

class LocationController extends Controller
{
    public function province()
    {
        try {
            $recordsProvince = Province::sort()->get();
            return response()->json([
                'code'    => 200,
                'result'  => LocationResource::collection($recordsProvince)
            ], 200);
        } catch (\Exception $e) {
            return $this->catchResponse($e);
        }
    }

    public function district($id)
    {
        try {
            $province = Province::find($id);
            if (is_null($province)) {
                throw new \Exception(trans('message.common.provinceNotFound'), 404);
            }
            $recordsDistrict = District::where('province_id', $id)->orderBy('id', 'DESC')->get();
            return response()->json([
                'code'    => 200,
                'result'  => LocationResource::collection($recordsDistrict)
            ], 200);
        } catch (\Exception $e) {
            return $this->catchResponse($e);
        }
    }

    public function ward($id)
    {
        try {
            $district = District::find($id);
            if (is_null($district)) {
                throw new \Exception(trans('message.common.districtNotFound'), 404);
            }
            $recordsWard = Ward::where('district_id', $id)->orderBy('id', 'DESC')->get();
            return response()->json([
                'code'    => 200,
                'result'  => LocationResource::collection($recordsWard)
            ], 200);
        } catch (\Exception $e) {
            return $this->catchResponse($e);
        }
    }
}
