<?php

namespace App\Http\Resources\Items;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemShowResource extends JsonResource
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
            'itemLookupCode' => $this->ItemLookupCode,
            'description' => $this->Description,
            'price' => number_format($this->Price, 2, ".", ","),
            'priceA' => number_format($this->PriceA, 2, ".", ","),
            'priceB' => number_format($this->PriceB, 2, ".", ","),
            'priceC' => number_format($this->PriceC, 2, ".", ",")
        ];
    }
}