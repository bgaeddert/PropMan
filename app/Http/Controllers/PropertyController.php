<?php

namespace App\Http\Controllers;

use \App\Models\Property;
use \App\Models\Owner;


/**
 * Class OwnerController
 * @package App\Http\Controllers
 */
class PropertyController extends Controller
{


    /**
     * Create a new controller instance.
     */
    public function __construct(Property $property){
        $this->middleware( 'auth' );
        $this->property = $property;
    }

    /**
     * Show the application dashboard to the user.
     *
     * @return Response
     */
    public function index(){

        $input = \Request::all();

        $properties = Property::with('Owner');

        if(!empty($input['owner_id']))
            $properties = $properties->ByOwner($input['owner_id']);

        if(!empty($input['onlyActive']))
            if($input['onlyActive'] === "true")
                $properties = $properties->OnlyActive();

        $properties = $properties->get();

        return \Response::json( [
            'success' => true,
            'message' => $_REQUEST,
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

        $property = new Property($input);

        $owner = Owner::find($input['owner_id']);

        $property = $owner->Properties()->save($property);

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

        $property = Property::with('Owner')->with('Org')->findOrFail( $id );

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
    public function edit( $id ){

        $property = Property::with('Owner')->findOrFail( $id );

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
