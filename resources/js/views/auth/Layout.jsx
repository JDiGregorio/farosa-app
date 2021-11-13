import React from 'react'
import moment from 'moment'

// import Image from '../../assets/img/login-paysheet.png'

export const withLayout = (WrappedComponent) => {
    return () => {
        return (
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                        
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>

                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            start your 14-day free trial
                            </a>
                        </p>
                    </div>

                    <div className="mt-8 space-y-6">
                            
                        <WrappedComponent />

                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-600">
                                ©{moment().format("Y")} FAROSA
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}