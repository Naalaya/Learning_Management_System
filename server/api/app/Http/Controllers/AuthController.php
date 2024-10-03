<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

// Models
use App\Models\Auth;

// Resources
use App\Http\Resources\AuthInfoResource;

// Utils
use App\Utils\Consts;

class AuthController extends Controller
{
    /**
     * Authenticate user and generate access token.
     *
     * This function handles the user login process. It checks if the user exists,
     * verifies the password, and if successful, creates an access token for the user.
     *
     * @param Request $request The incoming HTTP request containing username and password
     * @return \Illuminate\Http\JsonResponse Returns a JSON response with access token if successful, or error message if not
     * @throws \Exception If the user doesn't exist or the password is incorrect
     */
    public function login(Request $request)
    {
        try {
            $recordAuth = Auth::where('username', $request->username)->first();
            if (is_null($recordAuth)) {
                throw new \Exception('Tài khoản hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!', 400);
            }

            if (!Hash::check($request->password, $recordAuth->password)) {
                throw new \Exception('Tài khoản hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!', 400);
            }

            if ($recordAuth->status == Consts::USER_STATUS_BLOCKED) {
                throw new \Exception(trans('message.auth.accountBlocked'), 400);
            } elseif ($recordAuth->status == Consts::USER_STATUS_BANNED) {
                throw new \Exception(trans('message.auth.accountBanned'), 400);
            }

            $recordsAuthRole = $recordAuth->authRole()->first();
            if ($recordsAuthRole->role_id != $request->role_id) {
                throw new \Exception('Tài khoản không có quyền truy cập. Vui lòng kiểm tra lại!', 400);
            }

            $tokenResult = $recordAuth->createToken($recordAuth->username, [$request->role_id], now()->addWeek());
            $token       = $tokenResult->plainTextToken;
            $expiresAt   = $tokenResult->accessToken->expires_at;

            return response()->json([
                'code'=>200,
                'message' => trans('Login thành công!'),
                'result' => [
                    'access_token' => $token,
                    'token_type'   => 'Bearer',
                    'expires_at'   => $expiresAt,
                    'permission'   => $recordsAuthRole->role_id
                ]
            ], 200);
        } catch (\Exception $e) {
            return $this->catchResponse($e);
        }
    }

    /**
     * Retrieve authenticated user information.
     *
     * This function retrieves the authenticated user's information from the request.
     * If the user is not found, it throws an exception.
     * Otherwise, it returns the user's information as a JSON response.
     *
     * @param Request $request The incoming HTTP request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception If the user is not found
     */
    public function info(Request $request)
    {
        try {
            $recordAuth = $request->user();
            if (is_null($recordAuth)) {
                throw new \Exception('Tài khoản không tồn tại.', 404);
            }

            $recordProfile = $recordAuth->profile()->first();
            if (is_null($recordProfile)) {
                throw new \Exception('Tài khoản không tồn tại.', 404);
            }

            $recordProfile->status = $recordAuth->status;
            return response()->json([

                'code'=> 200,
                'result' => new AuthInfoResource($recordProfile)
            ], 200);
        } catch (\Exception $e) {
            return $this->catchResponse($e);
        }
    }

    /**
     * Logout the authenticated user.
     *
     * This function logs out the authenticated user by deleting the current access token.
     *
     * @param Request $request The incoming HTTP request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception If an error occurs during logout
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'code'      => 200,
                'message'   => trans('Đăng xuất thành công')
            ], 200);
        } catch (\Exception $e) {
            return $this->catchResponse($e);
        }
    }
}
