import React from 'react'

export const ToggleButton = props => props.canSee ? (
    <div className="flex justify-between items-center">
        <span className="ml-3" id="toggleLabel">
            <span className="text-sm font-medium text-gray-900">
                {props.text}
            </span>
        </span>

        <button type="button" aria-pressed="false" aria-labelledby="toggleLabel" onClick={() => props.onClick(props.name)} className={`${props.value ? 'bg-orange-400' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}>
            <span aria-hidden="true" className={`${props.value ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
        </button>
    </div>
) : (null)