<?php

namespace App\Http\Controllers;

use \App\Models\Property;
use \App\Models\Owner;
use \App\Models\Unit;


/**
 * Class OwnerController
 * @package App\Http\Controllers
 */
class UnitController extends Controller
{


    /**
     * Create a new controller instance.
     */
    public function __construct(Unit $unit){
        $this->middleware( 'auth' );
        $this->unit = $unit;
    }

    /**
     * Show the application dashboard to the user.
     *
     * @return Response
     */
    public function index(){

        $input = \Request::all();

        $units = Unit::with('Property');

        if(!empty($input['property_id']))
            $units = $units->ByProperty($input['property_id']);

        $units = $units->get();

        return \Response::json( [
            'success' => true,
            'message' => 'Units Loaded.',
            'data'    => $units
        ] );
    }

    /**
     * @return mixed
     */
    public function store(){

        $input = \Request::all();

        $validator = \Validator::make($input, [
            'property_id' => 'required',
            'unit_name' => 'required|max:255',
        ]);

        if($validator->fails())
            \App::abort( 400, $validator->messages()->first() );

        $unit = new Unit($input);

        $property = Property::find($input['property_id']);

        $unit = $property->Units()->save($unit);

        return \Response::json( [
            'success' => true,
            'message' => 'Unit Created.',
            'data'    => $unit
        ] );
    }

    /**
     *
     * @param $id
     * @return Response
     */
    public function show( $id ){

        $units = Unit::with(['Property','Property.Owner'])->findOrFail( $id );

        return \Response::json( [
            'success' => true,
            'message' => 'Units Loaded.',
            'data'    => $units
        ] );
    }

    /**
     * @param $id
     * @return mixed
     */
    public function edit( $id ){

        $units = Unit::with('Property')->findOrFail( $id );

        return \Response::json( [
            'success' => true,
            'message' => 'Unit Loaded.',
            'data'    => $units
        ] );
    }

    /**
     * @param $id
     * @return mixed
     */
    public function update( $id ){

        $input = \Request::all();

        $units = Unit::findOrFail( $id );

        $units->update( $input );

        return \Response::json( [
            'success' => true,
            'message' => 'Unit Updated.',
            'data'    => $units
        ] );
    }

    /**
     *
     * @param $id
     * @return Response
     */
    public function destroy( $id ){

        $unit = Unit::findOrFail( $id );

        $unit->delete( );

        return \Response::json( [
            'success' => true,
            'message' => 'Unit Deleted.',
            'data'    => []
        ] );
    }
}
