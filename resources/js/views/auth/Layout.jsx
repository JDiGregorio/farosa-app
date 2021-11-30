import React from 'react'
import moment from 'moment'

import Logo from '../../../img/farosa.png'

export const withLayout = (WrappedComponent) => {
    return () => {
        return (
            <div className="min-h-screen flex items-center justify-center py-12 px-8 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <img className="mx-auto h-52 w-auto" src={Logo} alt="Workflow" />

                    <div className="mt-8 space-y-6">
                            
                        <WrappedComponent />

                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-700">
                                ©{moment().format("Y")} FAROSA
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}