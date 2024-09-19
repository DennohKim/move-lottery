import React from 'react'

interface LayoutProps {
    children: React.ReactNode;
  }

const Layout: React.FC<LayoutProps> = ({
    children,
  }) => {
  return (
    <main className="h-screen bg-gradient-radial from-[#282828] via-[#1a1a1a] to-[#0a0a0a]">
      {children}
    </main>
  )
}

export default Layout
