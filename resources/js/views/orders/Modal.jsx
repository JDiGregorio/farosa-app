import React from 'react'
import ReactDOM from 'react-dom'
import { XIcon } from '@heroicons/react/outline'

export const Modal = props => {
    const executeCancelAction = event => {
        if (props.cancelAction) {
            props.cancelAction(event)
                .then(() => {
                    props.setShow(false)
                })
        } else {
            props.setShow(false)
        }
    }

    const step = props.stepsDefault[props.step]

    return props.canSee ? ReactDOM.createPortal(
        <>
            <div className="fixed z-40 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg">
                        <div className="bg-white">
                            <div className="py-2 px-4 flex justify-between border-b border-gray-200">
                                <h3 className="text-sm font-medium text-gray-500 uppercase">
                                    {step.title}
                                </h3>

                                <button type="button" onClick={executeCancelAction} className="bg-white rounded-md text-gray-400 focus:outline-none">
                                    <span className="sr-only">Close</span>
                                    <XIcon className="h-5 w-5" />
                                </button>
                            </div>

                            <div>
                                <div className="py-2 px-4 bg-gray-100">
                                    <p className="text-xs text-gray-500 font-medium">
                                        {step.instructions}
                                    </p>
                                </div>

                                {props.bodyModal}
                            </div>                        
                        </div>


                        <div className="bg-gray-50 py-3 px-4 flex justify-between">
                            <button type="button" onClick={executeCancelAction} className="rounded-md border border-red-300 shadow-sm px-2 py-2 bg-red-700 font-medium text-white text-sm">
                                Cancelar
                            </button>
                            
                            <div className="flex flex-row space-x-2">
                                { step.canSeePrevious ? (
                                    <button type="button" onClick={props.previousAction} className="rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white font-medium text-gray-700 text-sm">
                                        {step.previousTitle}
                                    </button>
                                ) : (null)}

                                { step.canSeeNext ? (
                                    <button type="button" onClick={props.nextAction} className={`rounded-md border  shadow-sm px-2 py-2 font-medium text-sm ${props.step === 3 ? 'bg-green-600 text-white border-green-600' : 'bg-gray-200 text-gray-700 border-gray-300'}`}>
                                        {step.nextTitle}
                                    </button>
                                ) : (null)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>, document.body
    ) : (null)
}