import React from 'react'

const Main = ({ children }) => (
  <main className="h-full bg-gray-50 overflow-y-auto">
    <div className="h-full container grid py-8 px-6 mx-auto">
      {children}
    </div>
  </main>
)

export default Main