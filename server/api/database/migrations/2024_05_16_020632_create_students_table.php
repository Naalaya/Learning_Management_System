<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->nullable()->references('id')->on('auths');
            $table->string('code', 20)->nullable()->comment('Mã học sinh');
            $table->string('password')->nullable()->comment('Mật khẩu đăng nhập');
            $table->string('phone', 10)->nullable()->comment('Số điện thoại');
            $table->string('name', 255)->comment('Tên học sinh');
            $table->string('profile_id', 12)->nullable()->comment('CMND/CCCD');
            $table->string('email', 255)->nullable()->comment('Email học sinh');
            $table->string('avatar', 255)->nullable()->comment('Hình đại diện học sinh');
            $table->tinyInteger('gender')->comment('Giới tính. 1: male, 2: female');
            $table->date('birthday')->comment('Ngày sinh');
            $table->date('joined_date')->nullable()->comment('Ngày nhập học');
            $table->string('address', 255)->nullable()->comment('Địa chỉ');
            $table->foreignId('province_id')->nullable()->references('id')->on('provinces')->comment('tinh/tp');
            $table->foreignId('district_id')->nullable()->references('id')->on('districts')->comment('quan/huyen');
            $table->foreignId('ward_id')->nullable()->references('id')->on('wards')->comment('phuong/xa');
            $table->tinyInteger('classify')->default(1)->comment('1: Tiềm năng, 2: Đang học, 3: Đã học');
            $table->json('data')->nullable()->comment('Sử dụng cho những trường chưa xác định cần lưu lại vd như current_school');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
