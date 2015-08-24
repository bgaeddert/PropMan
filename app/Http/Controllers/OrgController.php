<?php

namespace App\Http\Controllers;

use \App\Models\Org;


/**
 * Class OrgController
 * @package App\Http\Controllers
 */
class OrgController extends Controller
{


    /**
     * Create a new controller instance.
     */
    public function __construct(Org $org){
        $this->middleware( 'auth' );
        $this->org = $org;
    }


    /**
     * @param $id
     * @return mixed
     */
    public function edit( ){

        $orgs = Org::findOrFail( \Auth::user()->org_id );

        return \Response::json( [
            'success' => true,
            'message' => 'Org Loaded.',
            'data'    => $orgs
        ] );
    }

    /**
     * @param $id
     * @return mixed
     */
    public function update( ){

        $input = \Request::all();

        $orgs = Org::findOrFail( \Auth::user()->org_id );

        $orgs->update( $input );

        return \Response::json( [
            'success' => true,
            'message' => 'Org Updated.',
            'data'    => $orgs
        ] );
    }
}
