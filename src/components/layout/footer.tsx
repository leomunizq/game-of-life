import React from 'react'
import GithubLogo from '@/assets/github-mark-white.svg'

const Footer: React.FC = () => (
  <footer className="flex justify-center mt-auto">
    <a
      target="_blank"
      href="https://github.com/leomunizq/game-of-life"
      rel="noopener noreferrer"
    >
      <img
        src={GithubLogo}
        alt="Github profile"
        className="h-8 w-8 transition ease-in text-gray-300 hover:text-gray-400"
      />
    </a>
  </footer>
)

export default Footer
