<?php namespace App\ModelScopes;

trait OwnersByOrgTrait {
    /**
     * Boot the scope.
     *
     * @return void
     */
    public static function bootOwnersByOrgTrait()
    {
        static::addGlobalScope(new OwnersByOrgScope);
    }
}