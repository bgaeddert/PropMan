<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class OrgsTableSeeder extends Seeder
{

    public function run(){

        $org = array (
            array (
                'id'         => '1',
                'name'       => 'PROPERTY MANAGEMENT',
                'phone'      => '506-8888-8888',
                'address'    => 'COMPANY ADDRESS',
                'created_at' => new DateTime,
                'updated_at' => new DateTime,
            ),
        );

        DB::table( 'orgs' )->insert( $org );

    }

}