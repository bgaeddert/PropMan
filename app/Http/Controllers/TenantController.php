<?php

namespace App\Http\Controllers;

use \App\Models\Unit;
use \App\Models\Owner;
use \App\Models\Property;
use \App\Models\Tenant;


/**
 * Class TenantController
 * @package App\Http\Controllers
 */
class TenantController extends Controller
{


    /**
     * Create a new controller instance.
     */
    public function __construct(Tenant $tenant){
        $this->middleware( 'auth' );
        $this->tenant = $tenant;
    }

    /**
     * Show the application dashboard to the user.
     *
     * @return Response
     */
    public function index(){

        $input = \Request::all();

        $tenants = Tenant::with('Unit');

        if(!empty($input['unit_id']))
            $tenants = $tenants->ByUnit($input['unit_id']);

        $tenants = $tenants->get();

        return \Response::json( [
            'success' => true,
            'message' => 'Tenants Loaded.',
            'data'    => $tenants
        ] );
    }

    /**
     * @return mixed
     */
    public function store(){

        $input = \Request::all();

        $validator = \Validator::make($input, [
            'unit_id' => 'required',
            'tenant_name' => 'required|max:255',
        ]);

        if($validator->fails())
            \App::abort( 400, $validator->messages()->first() );

        $tenant = new Tenant($input);

        $unit = Unit::find($input['unit_id']);

        $tenant = $unit->Tenants()->save($tenant);

        return \Response::json( [
            'success' => true,
            'message' => 'Tenant Created.',
            'data'    => $tenant
        ] );
    }

    /**
     *
     * @param $id
     * @return Response
     */
    public function show( $id ){

        $tenants = Tenant::with(['Unit','Unit.Property'])->with('Org')->findOrFail( $id );

        return \Response::json( [
            'success' => true,
            'message' => 'Tenants Loaded.',
            'data'    => $tenants
        ] );
    }

    /**
     * @param $id
     * @return mixed
     */
    public function edit( $id ){

        $tenants = Tenant::with('Unit')->findOrFail( $id );

        return \Response::json( [
            'success' => true,
            'message' => 'Tenant Loaded.',
            'data'    => $tenants
        ] );
    }

    /**
     * @param $id
     * @return mixed
     */
    public function update( $id ){

        $input = \Request::all();

        $tenants = Tenant::findOrFail( $id );

        $tenants->update( $input );

        return \Response::json( [
            'success' => true,
            'message' => 'Tenant Updated.',
            'data'    => $tenants
        ] );
    }
}
