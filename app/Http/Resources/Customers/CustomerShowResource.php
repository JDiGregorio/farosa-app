<?php

namespace App\Http\Resources\Customers;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'firstName' => $this->FirstName,
            'accountNumber' => $this->AccountNumber,
            'accountBalance' => number_format($this->AccountBalance, 2, ".", ","),
            'creditLimit' => number_format($this->CreditLimit, 2, ".", ","),
            'available' => number_format($this->available, 2, ".", ",")
        ];
    }
}