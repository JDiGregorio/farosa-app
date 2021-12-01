<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Models\SaleRep;

use App\Http\Resources\Users\UserIndexResource;
use App\Http\Resources\Users\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UserIndexResource::collection(User::filter(request()->all())->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $entries =  $request->all();

        $entries['password'] = Hash::make($request->password);

        $user = User::create($entries);

        return response()->json(['userId' => $user->id]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $entries = $request->all();

        if ($request->password == "") {
            unset($entries['password']);
        } else {
            $entries['password'] = Hash::make($request->password);
        }

        $user->update($entries);

        return response()->json(['userId' => $user->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        return $user->delete();
    }

    public function getRelatedData(Request $request)
    {
        $response = [
            'representantes' => SaleRep::all()->map(function($item) {
                return [
                    'value' => $item->ID,
                    'label' => $item->Name
                ];
            })
        ];

        if ($request->userId) {
            $user = User::find($request->userId);
            $response['user'] = new UserResource($user);
        }

        return $response;
    }
}