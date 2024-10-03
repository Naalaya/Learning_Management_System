<?php

namespace App\Http\Middleware;

use App\Utils\Consts;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()->tokenCan(Consts::AUTH_ROLE_ADMIN)) {
            return response()->json([
                'code'    => 403,
                'message' => 'Tài khoản không có quyền truy cập. Vui lòng thử lại!',
            ], 403);
        }
        return $next($request);
    }
}
