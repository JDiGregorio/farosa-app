import React from 'react'

const Main = ({ children }) => (
  <main className="h-full bg-gray-50 overflow-y-auto">
    <div className="container grid px-6 mx-auto">
      {children}
    </div>
  </main>
)

export default Main