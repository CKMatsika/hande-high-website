<?php

namespace App\Policies;

use App\Models\User;

abstract class BaseContentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role !== null;
    }

    public function view(User $user, mixed $model): bool
    {
        return $user->role !== null;
    }

    public function create(User $user): bool
    {
        return $user->role !== null;
    }

    public function update(User $user, mixed $model): bool
    {
        return $user->role !== null;
    }

    public function delete(User $user, mixed $model): bool
    {
        return $user->isAdmin();
    }

    public function restore(User $user, mixed $model): bool
    {
        return $user->isAdmin();
    }

    public function forceDelete(User $user, mixed $model): bool
    {
        return $user->isAdmin();
    }
}
