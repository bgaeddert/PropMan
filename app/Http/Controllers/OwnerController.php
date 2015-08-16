<?php

namespace App\Http\Controllers;

use \App\Owner;


/**
 * Class OwnerController
 * @package App\Http\Controllers
 */
class OwnerController extends Controller
{


    /**
     * Create a new controller instance.
     */
    public function __construct(){
        $this->middleware( 'auth' );
    }

    /**
     * Show the application dashboard to the user.
     *
     * @return Response
     */
    public function index(){

        $owners = Owner::all();

        return \Response::json( [
            'success' => true,
            'message' => 'Owners Loaded.',
            'data'    => $owners
        ] );
    }

    /**
     *
     * @return Response
     */
    public function show( $id ){

        $owner = Owner::findOrFail( $id );

        return \Response::json( [
            'success' => true,
            'message' => 'Owners Loaded.',
            'data'    => $owner
        ] );
    }

    /**
     * @return mixed
     */
    public function create(){

        $input = \Request::all();

        $owner = Owner::create( $input );

        return \Response::json( [
            'success' => true,
            'message' => 'Owner Created.',
            'data'    => $owner
        ] );
    }

    /**
     * @param $id
     * @return mixed
     */
    public function edit( $id ){

        $owner = Owner::findOrFail( $id );

        return \Response::json( [
            'success' => true,
            'message' => 'Owner Loaded.',
            'data'    => $owner
        ] );
    }

    /**
     * @param $id
     * @return mixed
     */
    public function update( $id ){

        $input = \Request::all();

        $owner = Owner::findOrFail( $id );

        $owner->update( $input );

        return \Response::json( [
            'success' => true,
            'message' => 'Owner Updated.',
            'data'    => $owner
        ] );
    }
}
