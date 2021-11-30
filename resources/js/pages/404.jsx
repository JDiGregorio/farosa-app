import React from 'react'

const Page404 = () => (
  <div className="flex flex-col items-center">
    <h1 className="text-6xl font-semibold text-gray-700">
      404
    </h1>

    <p className="text-gray-700">
      Page not found. Check the address or{' '}
      <a className="text-purple-600 hover:underline" href="../index.html">
        go back
      </a>
      .
    </p>
  </div>
)

export default Page404