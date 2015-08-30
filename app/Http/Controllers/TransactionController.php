<?php

namespace App\Http\Controllers;

use \App\Models\Property;
use \App\Models\Tenant;
use \App\Models\transaction;


/**
 * Class TransactionController
 * @package App\Http\Controllers
 */
class TransactionController extends Controller
{


    /**
     * Create a new controller instance.
     */
    public function __construct(Transaction $transaction){
        $this->middleware( 'auth' );
        $this->transaction = $transaction;
    }

    public function index(){

        $input = \Request::all();

        $transactions = Transaction::with( 'Tenant' )->with('Property')->with('Org');

        if(!empty($input['tenant_id'])){
            $transactions = $transactions->ByTenant( $input[ 'tenant_id' ] );
        }

        if(!empty($input['property_id'])){
            $transactions = $transactions->ByProperty( $input[ 'property_id' ] );
        }

        $transactions = $transactions->get();

        return \Response::json( [
            'success' => true,
            'message' => 'Tenants Loaded.',
            'data'    => $transactions
        ] );
    }


    /**
     * @param $id
     * @return mixed
     */
    public function edit( ){

        $transaction = Transaction::findOrFail( \Auth::user()->org_id );

        return \Response::json( [
            'success' => true,
            'message' => 'Transaction Loaded.',
            'data'    => $transaction
        ] );
    }

    /**
     * @param $id
     * @return mixed
     */
    public function update( $id ){

        $input = \Request::all();

        $transaction = Transaction::findOrFail( $id );

        $transaction->update( $input );

        return \Response::json( [
            'success' => true,
            'message' => 'Transaction Updated.',
            'data'    => $transaction
        ] );
    }

    /**
     * @return mixed
     */
    public function store(){

        $input = \Request::all();

        $transaction = new Transaction($input);

        $transaction = $transaction->save();

        return \Response::json( [
            'success' => true,
            'message' => 'Transaction Created.',
            'data'    => $transaction
        ] );
    }

    /**
     *
     * @param $id
     * @return Response
     */
    public function show( $id ){

        $transactions = Transaction::findOrFail( $id );

        return \Response::json( [
            'success' => true,
            'message' => 'Transaction Loaded.',
            'data'    => $transactions
        ] );
    }
}
