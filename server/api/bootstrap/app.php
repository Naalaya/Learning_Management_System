<?php


use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// Middlewares
use App\Http\Middleware\{
    AdminRole,
    StudentRole,
    TeacherRole
};

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'admin'     => AdminRole::class,
            'teacher'   => TeacherRole::class,
            'student'   => StudentRole::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'code'    => 401,
                    'message' => 'Có lỗi xảy ra. Vui lòng đăng nhập lại',
                ], 401);
            }
        });
    })->create();
