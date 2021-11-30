import React from 'react'

export const Title = props  => {
  return (
    <h1 className="text-2xl font-semibold text-gray-700">
      {props.children}
    </h1>
  )
}