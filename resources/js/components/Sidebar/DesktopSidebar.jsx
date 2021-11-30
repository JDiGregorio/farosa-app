import React from 'react'

import SidebarContent from './SidebarContent'

const DesktopSidebar = props => {
  return (
    <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white">
      <SidebarContent />
    </aside>
  )
}

export default DesktopSidebar
