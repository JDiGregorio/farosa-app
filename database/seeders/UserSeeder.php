<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
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
        $now = Carbon::now();

        DB::table('users')->delete();
        
        DB::table('users')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'José Di Gregorio',
                'email' => 'jdgregorio07@gmail.com',
                'email_verified_at' => NULL,
                'password' => Hash::make('Digregorio21##'),
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'remember_token' => NULL,
                'enter_price' => true,
                'SalesRep_id' => NULL,
                'type_user' => true,
                'username' => 'digregorio',
                'created_at' => $now,
                'updated_at' => $now
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Eduardo Castillo',
                'email' => 'luis.eduardoct85@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$Dza5rXoRFZBsLAiyCinKtO0Y2PcpGqgUu0.Q0nWDAH9aE/4rqPlZa',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'remember_token' => NULL,
                'enter_price' => true,
                'SalesRep_id' => 12,
                'type_user' => true,
                'username' => 'ecastillo',
                'created_at' => $now,
                'updated_at' => $now
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Rolando Turcios',
                'email' => 'rturcios@farosa.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$7bNqqyvetXmnWVFgdYJUHe84Hh5blSCEBMNKMQOfphucY7Z1Qh1yW',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'remember_token' => NULL,
                'enter_price' => false,
                'SalesRep_id' => 6,
                'type_user' => false,
                'username' => 'Rturcios',
                'created_at' => $now,
                'updated_at' => $now
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Williams Gomez',
                'email' => 'wgomez@farosa.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$1TLSftNUDKQC54Zxx/SMo.DJd0iVLOEqXnzS3GQliDOPyElz46yee',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'remember_token' => NULL,
                'enter_price' => false,
                'SalesRep_id' => 8,
                'type_user' => false,
                'username' => 'Wgomez',
                'created_at' => $now,
                'updated_at' => $now
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'David Sanchez',
                'email' => 'dsanchez@farosa.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$OzB0oKJ9SBzbuaMY5YVgpuiVvkFT9KlW/pWU.XeGqSnVipjdmvGvG',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'remember_token' => NULL,
                'enter_price' => false,
                'SalesRep_id' => 3,
                'type_user' => false,
                'username' => 'Dsanchez',
                'created_at' => $now,
                'updated_at' => $now
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'Esdras Rodríguez',
                'email' => 'dfunez@farosa.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$.EOC3k14uql.SRSxmhHYleqDrMQpGrN9OccPJSEKrJPK5Ers7LQpO',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'remember_token' => NULL,
                'enter_price' => false,
                'SalesRep_id' => 2,
                'type_user' => false,
                'username' => 'Erodriguez',
                'created_at' => $now,
                'updated_at' => $now
            ),
            6 => 
            array (
                'id' => 7,
                'name' => 'Alejandro Rodriguez',
                'email' => 'alejandro@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$Pl.9FbDNjwydwobOtnwtDeIMQNxoJST4BrlAxbU/O3ShiLEzh8uES',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'remember_token' => NULL,
                'enter_price' => true,
                'SalesRep_id' => 5,
                'type_user' => true,
                'username' => 'Arodriguez',
                'created_at' => $now,
                'updated_at' => $now
            ),
            7 => 
            array (
                'id' => 8,
                'name' => 'Elmer Amaya',
                'email' => 'elmer@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$z0qrWzVKkz9RDbFtqqCJBOXqVoUN3LF8x.NcPmBundhpBNAvGbaJ.',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'remember_token' => NULL,
                'enter_price' => false,
                'SalesRep_id' => 4,
                'type_user' => false,
                'username' => 'Eamaya',
                'created_at' => $now,
                'updated_at' => $now
            ),
            8 => 
            array (
                'id' => 9,
                'name' => 'Carlos Canales',
                'email' => 'carloscanales@farosa.hn',
                'email_verified_at' => NULL,
                'password' => '$2y$10$y4Q7tsE7ioz5x4xmd2jvuuCqpJUVdkHzRw2lN/LMDtUhnKXVvakqq',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'remember_token' => NULL,
                'enter_price' => false,
                'SalesRep_id' => 1,
                'type_user' => false,
                'username' => 'ccanales',
                'created_at' => $now,
                'updated_at' => $now
            ),
            9 => 
            array (
                'id' => 10,
                'name' => 'Wilmer Castro',
                'email' => 'wcastro@farosa.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$2saj8laNAaRt92eSo.FbR.kXUZyEAKOIelfsrwCCogDLc.Zb6L0aq',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'remember_token' => NULL,
                'enter_price' => false,
                'SalesRep_id' => 13,
                'type_user' => false,
                'username' => 'Wcastro',
                'created_at' => $now,
                'updated_at' => $now
            ),
            10 => 
            array (
                'id' => 11,
                'name' => 'Alejandra Rodríguez',
                'email' => 'k.alejandrar@hotmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$KgItLRZr0IE/XRqHhcgQtudfnkCVUPj711PEK6bXaSo1WYHsqTdNu',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'remember_token' => NULL,
                'enter_price' => true,
                'SalesRep_id' => 12,
                'type_user' => true,
                'username' => 'karodriguez',
                'created_at' => $now,
                'updated_at' => $now
            ),
            11 => 
            array (
                'id' => 12,
                'name' => 'Heber Rodríguez',
                'email' => 'heber.rodriguez@farosa.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$1dyFNgZKg2FqvSClOWGV2eRcolrEVJ4kTIsK8CM1L48Ig/aUAXw3i',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'remember_token' => NULL,
                'enter_price' => false,
                'SalesRep_id' => 14,
                'type_user' => false,
                'username' => 'HRodriguez',
                'created_at' => $now,
                'updated_at' => $now
            ),
        ));
    }
}