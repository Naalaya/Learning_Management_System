<?php

namespace App\Http\Controllers;

abstract class Controller
{
    /**
     * custom catch exception
     *
     * @param \Exception $e
     * @return \Illuminate\Http\JsonResponse
     */
    protected function catchResponse(\Exception $e)
    {
        $statusCode = [400, 401, 403, 404, 405, 409, 422];
        $code = in_array($e->getCode(), $statusCode) ? $e->getCode() : 500;
        if (isset($e->status) && in_array($e->status, [422])) {
            $code = $e->status;
        }
        if ($code == 500) \Log::error($e->getMessage());
        return response()->json([
            'code'    => $code,
            'message' => $code == 500 ? trans('message.code.500') : $e->getMessage()
        ], $code);
    }
}
