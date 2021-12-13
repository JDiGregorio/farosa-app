<?php

namespace App\Http\Resources\Transactions;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionHoldShowResource extends JsonResource
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
            'id' => $this->ID,
            'customer' => $this->CustomerID ? ($this->customer ? $this->customer->FirstName : "-") : "-",
            'date' => $this->TransactionTime,
            'holdComment' => $this->HoldComment,
            'available' => $this->CustomerID ? ($this->customer ? $this->customer->available : 0.00) : 0.00,
            'products' => collect($this->products)->map(function($item) {
                return [
                    'ID' => $item->ID,
                    'Description' => $item->Description,
                    'QuantityPurchased' => (float)number_format($item->QuantityPurchased, 2, '.', ''),
                    'Price' => (float)number_format($item->Price, 2, '.', '')
                ];
            })
        ];
    }
}