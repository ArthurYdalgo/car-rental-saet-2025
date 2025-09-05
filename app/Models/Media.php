<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uploader_id',
        'model_id',
        'model_type',
        'tag',

        'disk',
        'relative_path',
        'name',
        'extension',

        'size_in_bytes',
        'mime',
        'is_public',
    ];

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean'
        ];
    }

    #region Relationships
    public function model()
    {
        return $this->morphTo();
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploader_id');
    }

    // Methods
    public function getUrlAttribute()
    {
        if ($this->is_public) {
            return $this->storage_url;
        }

        /**
         * @todo Implement a way to generate a signed URL for private files
         */
        // return route('media.show', $this->id);
    }

    public function getHumanSizeAttribute()
    {
        return humanFileSize($this->size_in_bytes);
    }
}
