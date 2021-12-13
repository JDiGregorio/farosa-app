<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        $users = [
            [
                'name' => 'José Di Gregorio',
                'email' => 'jdgregorio07@gmail.com',
                'password' => Hash::make('Digregorio21##'),
                'enter_price' => TRUE,
                'type_user' => TRUE,
                'username' => 'digregorio'
            ], [
                'name' => 'Eduardo Castillo',
                'email' => 'luis.eduardoct85@gmail.com',
                'password' => '$2y$10$Dza5rXoRFZBsLAiyCinKtO0Y2PcpGqgUu0.Q0nWDAH9aE/4rqPlZa',
                'enter_price' => TRUE,
                'SalesRep_id' => 12,
                'type_user' => TRUE,
                'username' => 'ecastillo'
            ], [
                'name' => 'Rolando Turcios',
                'email' => 'rturcios@farosa.com',
                'password' => '$2y$10$7bNqqyvetXmnWVFgdYJUHe84Hh5blSCEBMNKMQOfphucY7Z1Qh1yW',
                'enter_price' => FALSE,
                'SalesRep_id' => 6,
                'type_user' => FALSE,
                'username' => 'Rturcios'
            ], [
                'name' => 'Williams Gomez',
                'email' => 'wgomez@farosa.com',
                'password' => '$2y$10$1TLSftNUDKQC54Zxx/SMo.DJd0iVLOEqXnzS3GQliDOPyElz46yee',             
                'enter_price' => FALSE,
                'SalesRep_id' => 8,
                'type_user' => FALSE,
                'username' => 'Wgomez'
            ], [
                'name' => 'David Sanchez',
                'email' => 'dsanchez@farosa.com',
                'password' => '$2y$10$OzB0oKJ9SBzbuaMY5YVgpuiVvkFT9KlW/pWU.XeGqSnVipjdmvGvG',            
                'enter_price' => FALSE,
                'SalesRep_id' => 3,
                'type_user' => FALSE,
                'username' => 'Dsanchez'
            ], [
                'name' => 'Esdras Rodríguez',
                'email' => 'dfunez@farosa.com',
                'password' => '$2y$10$.EOC3k14uql.SRSxmhHYleqDrMQpGrN9OccPJSEKrJPK5Ers7LQpO',
                'enter_price' => FALSE,
                'SalesRep_id' => 2,
                'type_user' => FALSE,
                'username' => 'Erodriguez'
            ], [
                'name' => 'Alejandro Rodriguez',
                'email' => 'alejandro@gmail.com',
                'password' => '$2y$10$Pl.9FbDNjwydwobOtnwtDeIMQNxoJST4BrlAxbU/O3ShiLEzh8uES',
                'enter_price' => TRUE,
                'SalesRep_id' => 5,
                'type_user' => TRUE,
                'username' => 'Arodriguez' 
            ], [
                'name' => 'Elmer Amaya',
                'email' => 'elmer@gmail.com',
                'password' => '$2y$10$z0qrWzVKkz9RDbFtqqCJBOXqVoUN3LF8x.NcPmBundhpBNAvGbaJ.',
                'enter_price' => FALSE,
                'SalesRep_id' => "4",
                'type_user' => FALSE,
                'username' => 'Eamaya'
            ], [
                'name' => 'Carlos Canales',
                'email' => 'carloscanales@farosa.hn',
                'password' => '$2y$10$y4Q7tsE7ioz5x4xmd2jvuuCqpJUVdkHzRw2lN/LMDtUhnKXVvakqq',
                'enter_price' => FALSE,
                'SalesRep_id' => 1,
                'type_user' => FALSE,
                'username' => 'ccanales'
            ], [
                'name' => 'Wilmer Castro',
                'email' => 'wcastro@farosa.com',
                'password' => '$2y$10$2saj8laNAaRt92eSo.FbR.kXUZyEAKOIelfsrwCCogDLc.Zb6L0aq',
                'enter_price' => FALSE,
                'SalesRep_id' => 13,
                'type_user' => FALSE,
                'username' => 'Wcastro'
            ], [
                'name' => 'Alejandra Rodríguez',
                'email' => 'k.alejandrar@hotmail.com',
                'password' => '$2y$10$KgItLRZr0IE/XRqHhcgQtudfnkCVUPj711PEK6bXaSo1WYHsqTdNu',
                'enter_price' => TRUE,
                'SalesRep_id' => 12,
                'type_user' => TRUE,
                'username' => 'karodriguez',
            ], [
                'name' => 'Heber Rodríguez',
                'email' => 'heber.rodriguez@farosa.com',
                'password' => '$2y$10$1dyFNgZKg2FqvSClOWGV2eRcolrEVJ4kTIsK8CM1L48Ig/aUAXw3i',
                'enter_price' => FALSE,
                'SalesRep_id' => 14,
                'type_user' => FALSE,
                'username' => 'HRodriguez'
            ]
        ];

        foreach ($users as $array) {
            User::create($array);
        }
    }
}