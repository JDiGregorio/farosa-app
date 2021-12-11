<?php

namespace App\Http\Resources\Transactions;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionHoldIndexResource extends JsonResource
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
            'customerId' => $this->CustomerID ? ($this->customer ? $this->customer->FirstName : "-") : "-",
            'holdComment' => $this->HoldComment
        ];
    }
}