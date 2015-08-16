<?php namespace App\Http\Controllers;

class UserController extends Controller {


	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
        $id = \Input::get('id');

        return \Response::json(\App\User::findOrFail($id));
	}

    public function postTest(){

        $textInput = \Input::get('textInput');

        if( ! $textInput ){
            $textInput = 'Type some text first!';
        }

        return \Response::json($textInput);
    }

    public function getUser($id){

        $user = \App\User::findOrFail(\Auth::user()->id);

        return view('blades.tab2', compact('user'));
    }

}
