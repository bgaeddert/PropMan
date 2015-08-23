<?php

namespace App\Http\Controllers;

use \App\Models\Owner;


/**
 * Class OwnerController
 * @package App\Http\Controllers
 */
class OwnerController extends Controller
{


    /**
     * Create a new controller instance.
     */
    public function __construct(Owner $owner){
        $this->middleware( 'auth' );
        $this->owner = $owner;
    }

    /**
     * Show the application dashboard to the user.
     *
     * @return Response
     */
    public function index(){
        $input = \Request::all();

        $owners = Owner::all();

        if(!empty($input['onlyActive']))
            if($input['onlyActive'] === "true")
                $owners = Owner::OnlyActive()->get();

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
    public function store(){

        $input = \Request::all();

        $validator = \Validator::make($input, [
            'org_id' => "in:" . \Auth::user()->org_id,
            'owner_name' => 'required|max:255',
        ]);

        if($validator->fails())
            \App::abort( 400, $validator->messages()->first() );


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
