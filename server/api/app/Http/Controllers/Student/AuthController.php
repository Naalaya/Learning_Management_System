<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Resources\Student\StudentInfoResource;
use App\Models\Student;
use App\Utils\Consts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
            $recordStudent = Student::where('code', $request->username)->first();
            if (is_null($recordStudent)) {
                throw new \Exception('Tài khoản hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!', 400);
            }

            if (!Hash::check($request->password, $recordStudent->password)) {
                throw new \Exception('Tài khoản hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!', 400);
            }

            if ($request->role_id != Consts::AUTH_ROLE_STUDENT) {
                throw new \Exception('Tài khoản không có quyền. Vui lòng đăng nhập laij ', 400);
            }

            $tokenResult = $recordStudent->createToken($recordStudent->code, [Consts::AUTH_ROLE_STUDENT], now()->addWeek());
            $token       = $tokenResult->plainTextToken;
            $expiresAt   = $tokenResult->accessToken->expires_at;

            return response()->json([
                'message' => trans('Login thành công.'),
                'result' => [
                    'access_token' => $token,
                    'token_type'   => 'Bearer',
                    'expires_at'   => $expiresAt
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
            $recordStudent = $request->user();
            if (is_null($recordStudent)) {
                throw new \Exception('Tài khoản không tồn tại.', 404);
            }

            return response()->json([
                'result' => new StudentInfoResource($recordStudent)
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
