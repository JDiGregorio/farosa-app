import ReactDOM from 'react-dom'
import { XIcon } from '@heroicons/react/solid'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { Transition } from '@windmill/react-ui'

export const AlertConfirm = props => {
  const app = document.getElementById('alert-container')

  ReactDOM.render(
    <>
      <div id="alert-confirm-action" aria-live="assertive" className="z-40 top-16 fixed inset-0 flex px-4 py-6 pointer-events-none sm:p-6 items-start">
        <div className="w-full flex flex-col items-centealert-confirm-actionpace-y-4 sm:items-end">
          <Transition show={true} enter="transform ease-out duration-300 transition" enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enterTo="translate-y-0 opacity-100 sm:translate-x-0" leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <ExclamationCircleIcon className="h-10 w-10" />
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {props.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {props.message}
                    </p>
                    <div className="mt-4 flex">
                      <button type="button" onClick={() => { props.onConfirm(); if (app) { ReactDOM.unmountComponentAtNode(app) }}} className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {props.acceptButtonText}
                      </button>

                      <button type="button" onClick={() => { if (app) { ReactDOM.unmountComponentAtNode(app) }}} className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {props.cancelButtonText}
                      </button>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button onClick={() => {if (app) { ReactDOM.unmountComponentAtNode(app) }}} className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>, app
  )
}