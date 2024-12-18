<?php

namespace App\Policies;

use App\Models\User;

class RolePolicy
{
    public function provider(User $user)
    {
        return $user->role === 'provider';
    }

    public function customer(User $user)
    {
        return $user->role === 'customer';
    }
}
