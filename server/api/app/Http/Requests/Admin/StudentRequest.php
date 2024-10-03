<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code'          => 'nullable|string|max:20',
            'phone'         => 'nullable|string|max:10',
            'name'          => 'required|string|max:255',
            'email'         => 'nullable|string|max:255',
            'avatar'        => 'nullable|string|max:255',
            'gender'        => 'required|numeric|in:1,2',
            'birthday'      => 'required|date',
            'joined_date'   => 'nullable|date',
            'address'       => 'nullable|string|max:255',
            'province_id'   => 'nullable|numeric|exists:provinces,id',
            'district_id'   => 'nullable|numeric|exists:districts,id',
            'ward_id'       => 'nullable|numeric|exists:wards,id',
            'classify'      => 'required|numeric|in:1,2,3',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = [
            'code'    => 422,
            'message' => $validator->errors()->first(),
            'errors'  => []
        ];

        foreach ($validator->errors()->messages() as $key => $messages) {
            foreach ($messages as $message) {
                $response['errors'][] = [
                    'key'     => $key,
                    'message' => $message
                ];
            }
        }

        throw new HttpResponseException(response()->json($response, 422));
    }
}
