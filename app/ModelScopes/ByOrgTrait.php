<?php namespace App\ModelScopes;

trait ByOrgTrait {
    /**
     * Boot the scope.
     *
     * @return void
     */
    public static function bootOwnersByOrgTrait()
    {
        static::addGlobalScope(new ByOrgScope);
    }
}