import React from 'react'

const Main = ({ children }) => (
  <main className="h-full overflow-y-auto">
    <div className="container grid py-6 px-6 mx-auto">
      {children}
    </div>
  </main>
)

export default Main