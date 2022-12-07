import React from 'react'

function SidebarLink({Icon, Text, active}) {
  return (
    <div className={`text-[#d9d9d9] flex items-center justify-center 
        xl:justify-start text-md space-x-3 hoverAnimation ${active && "font-bold" }`}>
        <Icon className="h-[1.6rem] text-white" />
        <span className='hidden xl:inline'> {Text}</span>

    </div>
  )
}

export default SidebarLink