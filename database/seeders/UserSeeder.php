<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create(
            [
                'name' => 'David Delcid',
                'email' => 'franando14@gmail.com',
                'username' => 'divel',
                'password' => Hash::make('123456')
            ],
            [
                'name' => 'Jose Digregorio',
                'username' => 'digregorio06',
                'email' => 'ddigregorio06@gmail.com',
                'password' => Hash::make('123456')
            ]
        );
    }
}
