<?php

namespace App\Http\Resources\Admin;

use App\Utils\Helpers;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentInfoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'teacher_id'    => $this->teacher_id,
            'code'          => $this->code,
            'password'      => $this->password,
            'phone'         => $this->phone,
            'name'          => $this->name,
            'profile_id'    => $this->profile_id,
            'email'         => $this->email,
            'avatar'        => $this->avatar,
            'gender'        => $this->gender,
            'birthday'      => $this->birthday,
            'joined_date'   => $this->joined_date,
            'address'       => $this->address,
            'province_id'   => $this->province_id,
            'district_id'   => $this->district_id,
            'ward_id'       => $this->ward_id,
            'address_full'  => Helpers::addressFull($this->address, $this->ward, $this->district, $this->province),
            'classify'      => $this->classify,
            'data'          => $this->data
        ];
    }
}
