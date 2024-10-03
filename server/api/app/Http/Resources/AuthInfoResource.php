<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

// Utils
use App\Utils\Helpers;

class AuthInfoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'role'      => $this->auth_id,
            'name'         => $this->name,
            'phone'        => $this->phone,
            'email'        => $this->email,
            'profile_id'   => $this->profile_id,
            'status'       => $this->status,
            'avatar'       => $this->avatar,
            'gender'       => $this->gender,
            'birthday'     => $this->birthday,
            'ward_id'      => $this->ward_id,
            'district_id'  => $this->district_id,
            'province_id'  => $this->province_id,
            'address'      => $this->address,
            'address_full' => Helpers::addressFull($this->address, $this->ward, $this->district, $this->province)
        ];
    }
}
