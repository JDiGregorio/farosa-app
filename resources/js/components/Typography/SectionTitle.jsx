import React from 'react'

export const SectionTitle = props => {
  return (
    <h2 className="mb-4 text-lg font-semibold text-gray-600">
      {props.children}
    </h2>
  )
}