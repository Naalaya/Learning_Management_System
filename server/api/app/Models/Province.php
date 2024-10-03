<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $table = 'provinces';
    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    // Scope
    public function scopeSort($query, ?string $type = 'DESC')
    {
        return $query->orderBy('sort', $type);
    }
}
