<?php

namespace App\Http\Resources\Items;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemIndexResource extends JsonResource
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
            'itemLookupCode' => $this->ItemLookupCode,
            'description' => $this->Description,
            'quantity' => $this->Quantity,
        ];
    }
}