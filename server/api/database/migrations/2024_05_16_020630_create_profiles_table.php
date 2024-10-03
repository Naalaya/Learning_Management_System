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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('auth_id')->references('id')->on('auths');
            $table->string('name', 255)->comment('');
            $table->string('phone', 10)->unique()->comment('');
            $table->timestamp('phone_verified_at')->nullable()->comment('');
            $table->string('email', 250)->nullable()->comment('');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('avatar', 300)->nullable()->comment('url avatar');
            $table->string('profile_id', 12)->nullable()->comment('CMND/CCCD');
            $table->date('birthday')->nullable()->comment('ngay sinh');
            $table->tinyInteger('gender')->nullable()->comment('1: male, 2: female');
            $table->foreignId('province_id')->nullable()->references('id')->on('provinces')->comment('tinh/tp');
            $table->foreignId('district_id')->nullable()->references('id')->on('districts')->comment('quan/huyen');
            $table->foreignId('ward_id')->nullable()->references('id')->on('wards')->comment('phuong/xa');
            $table->string('address', 255)->nullable()->comment('so nha, ten duong');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
