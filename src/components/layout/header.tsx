import React from 'react'

interface HeaderProps {
  generation: number
}

const Header: React.FC<HeaderProps> = ({ generation }) => (
  <header className="w-full text-center">
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
      Game of Life
    </h1>
    <p className="leading-7 text-white" role="status" aria-live="polite">
      Generation: {generation}
    </p>
  </header>
)

export default Header
