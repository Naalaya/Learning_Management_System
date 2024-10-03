<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Auth extends Model
{
    use HasFactory, HasApiTokens;
    protected $table = 'auths';
    protected $fillable = [
        'username',
        'password',
        'role_id',
        'status',
    ];

    // Relationships
    public function authRole()
    {
        return $this->hasOne(AuthRole::class, 'auth_id', 'id');
    }
    public function profile()
    {
        return $this->hasOne(Profile::class, 'auth_id', 'id');
    }
}
