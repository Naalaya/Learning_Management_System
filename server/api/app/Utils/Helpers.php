<?php

namespace App\Utils;

class Helpers
{
    public static function strCode($code) {
        return strtoupper(preg_replace('/[^a-zA-Z0-9]/', '', $code));
    }

    /**
     * Hash the given value.
     *
     * @param  string  $path
     * @return string
     */
    public static function mediaUrl($path)
    {
        return ENV('APP_URL') . 'upload' . $path;
    }

    public static function addressFull($address, $ward, $district, $province) {
        $wardName     = is_null($ward) ? '' : $ward->name;
        $districtName = is_null($district) ? '' : $district->name;
        $provinceName = is_null($province) ? '' : $province->name;

        return implode(', ', array_filter([$address, $wardName, $districtName, $provinceName]));
    }
}
