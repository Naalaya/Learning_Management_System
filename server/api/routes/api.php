<?php

use App\Http\Controllers\Admin\StudentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Student\AuthController as StudentAuthController;

Route::prefix('admin')->group(function() {
    // Admin authentication
    Route::prefix('auth')->controller(AuthController::class)->group(function() {
        Route::post('/login', 'login');
        Route::get('/info', 'info')->middleware(['auth:sanctum', 'admin']);
        Route::get('/logout', 'logout')->middleware(['auth:sanctum', 'admin']);
    });

    // Student CRUD API
    Route::group(['middleware' => ['auth:sanctum', 'admin']], function() {
        Route::controller(StudentController::class)->group(function() {
            Route::get('/student', 'index');
            Route::get('/student/option', 'option');
            Route::get('/student/{id}', 'show');
            Route::post('/student', 'store');
            Route::put('/student/{id}', 'update');
            Route::delete('/student/{id}', 'destroy');
        });
    });
});

Route::prefix('teacher')->group(function() {
    // Teacher authentication
    Route::prefix('auth')->controller(AuthController::class)->group(function() {
        Route::post('/login', 'login');
        Route::get('/info', 'info')->middleware(['auth:sanctum', 'teacher']);
        Route::get('/logout', 'logout')->middleware(['auth:sanctum', 'teacher']);
    });
});

Route::prefix('student')->group(function() {
    // Student authentication
    Route::prefix('auth')->controller(StudentAuthController::class)->group(function() {
        Route::post('/login', 'login');
        Route::get('/info', 'info')->middleware(['auth:sanctum', 'student']);
        Route::get('/logout', 'logout')->middleware(['auth:sanctum', 'student']);
    });
});
