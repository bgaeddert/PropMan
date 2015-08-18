<?php

namespace App\Http\Controllers;

use \App\Property;


/**
 * Class OwnerController
 * @package App\Http\Controllers
 */
class PropertyController extends Controller
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

        $properties = Property::with('Owner')->get();

        return \Response::json( [
            'success' => true,
            'message' => 'Owners Loaded.',
            'data'    => $properties
        ] );
    }

    /**
     * @return mixed
     */
    public function create(){

        $input = \Request::all();

        $property = Property::create( $input );

        return \Response::json( [
            'success' => true,
            'message' => 'Property Created.',
            'data'    => $property
        ] );
    }

    /**
     *
     * @return Response
     */
    public function show( $id ){

        $property = Owner::findOrFail( $id );

        return \Response::json( [
            'success' => true,
            'message' => 'Owners Loaded.',
            'data'    => $property
        ] );
    }

    /**
     * @param $id
     * @return mixed
     */
    public function edit( $id ){

        $property = Property::findOrFail( $id );

        return \Response::json( [
            'success' => true,
            'message' => 'Property Loaded.',
            'data'    => $property
        ] );
    }

    /**
     * @param $id
     * @return mixed
     */
    public function update( $id ){

        $input = \Request::all();

        $property = Property::findOrFail( $id );

        $property->update( $input );

        return \Response::json( [
            'success' => true,
            'message' => 'Owner Updated.',
            'data'    => $property
        ] );
    }
}
