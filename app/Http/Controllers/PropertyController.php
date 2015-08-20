<?php

namespace App\Http\Controllers;

use \App\Property;
use \App\Owner;


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
        $this->org_id = \Auth::user()->org_id;
    }

    /**
     * Show the application dashboard to the user.
     *
     * @return Response
     */
    public function index(){

        $input = \Request::all();

        $properties = Property::select()
            ->join('owners', 'owners.id', '=', 'properties.owner_id')
            ->where('org_id',\Auth::User()->org_id)
            ->with('Owner');

        if(!empty($input['owner_id']))
            $properties = $properties->where('owner_id', $input['owner_id']);

        $properties = $properties->get();

        return \Response::json( [
            'success' => true,
            'message' => 'Owners Loaded.',
            'data'    => $properties
        ] );
    }

    /**
     * @return mixed
     */
    public function store(){

        $input = \Request::all();

        $validator = \Validator::make($input, [
            'owner_id' => 'required',
            'property_name' => 'required|max:255',
        ]);

        if($validator->fails())
            \App::abort( 400, $validator->messages()->first() );

        $owner = Owner::findOrFail($input['owner_id']);

        if($owner->org_id != $this->org_id)
            \App::abort( 400, 'Invalid Organization!' );

        $property = Property::create( $input );

        return \Response::json( [
            'success' => true,
            'message' => 'Property Created.',
            'data'    => $property
        ] );
    }

    /**
     *
     * @param $id
     * @return Response
     */
    public function show( $id ){

        $property = Property::with('Owner')->findOrFail( $id );

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
