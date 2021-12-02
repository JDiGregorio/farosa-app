import ReactDOM from 'react-dom'
import { CheckCircleIcon, ExclamationIcon, InformationCircleIcon } from '@heroicons/react/outline'

export const Alert = props => {
    let alertSvg = undefined

    const alertContainer = document.getElementById('simple-alert')

    switch (props.action) {
        case 'Success': alertSvg = (<CheckCircleIcon className="h-6 w-6 text-green-600" />)
            break;

        case 'Error': alertSvg = (<ExclamationIcon className="h-6 w-6 text-red-600" />)
            break;

        case 'Info': alertSvg = (<InformationCircleIcon className="h-6 w-6 text-blue-600" />)
            break;

        default:
            break;
    }

    const cleanup = () => {
        if (alertContainer) {
            ReactDOM.unmountComponentAtNode(alertContainer)
        }
    }

    setTimeout(() => {
        cleanup()
    }, 7000)

    ReactDOM.render(
        <div className="z-50 fixed top-16 mx-4 sm:right-7 rounded-lg shadow-2xl">
            <div className={`animate-enter max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                <div className="flex-1 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            {alertSvg}
                        </div>

                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {props.action}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {props.message}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button onClick={() => cleanup()}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Close
                    </button>
                </div>
            </div>
        </div>, alertContainer
    )
}