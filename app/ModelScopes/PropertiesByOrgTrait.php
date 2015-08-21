<?php namespace App\ModelScopes;

trait PropertiesByOrgTrait {
    /**
     * Boot the scope.
     *
     * @return void
     */
    public static function bootPropertiesByOrgTrait()
    {
        static::addGlobalScope(new PropertiesByOrgScope);
    }
}