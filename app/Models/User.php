<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

use Illuminate\Auth\Passwords\CanResetPassword as PasswordsCanResetPassword;
use Illuminate\Contracts\Auth\CanResetPassword;

use App\Notifications\ResetPasswordNotification;

class User extends Authenticatable implements CanResetPassword
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use PasswordsCanResetPassword;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = ['name', 'username', 'password', 'enter_price', 'SalesRep_id', 'type_user'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = ['email_verified_at' => 'datetime'];

    /*-------------------------------------------------------------------------
    | FUNCTIONS
    |------------------------------------------------------------------------*/

	protected static function booted()
	{
		self::creating(function($model) {
			$model->type_user = 1;
        });
	}

    public function sendPasswordResetNotification($token)
	{
		$this->notify(new ResetPasswordNotification($token, $this->name));
	}

    /*-------------------------------------------------------------------------
    | RELATIONS
    |------------------------------------------------------------------------*/

    public function saleRep()
	{
		return $this->belongsTo(SaleRep::class, 'SalesRep_id');
	}

    /*------------------------------------------------------------------------
    | SCOPES
	|-----------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------
	| ACCESORS
    |------------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------
    | MUTATORS
    |------------------------------------------------------------------------*/

}