import React from 'react'
import Link from 'next/link'
import {LockIcon} from 'lucide-react'
const Header = () => {
  return (
    <header className="container mx-auto px-6 py-8">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <LockIcon className="h-8 w-8 text-indigo-400" />
            <span className="text-2xl font-bold">DuoPass</span>
          </Link>
          <div className="space-x-4">
            <Link href="/login" className="text-white hover:text-indigo-300 transition">Login</Link>
            <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition">Sign Up</Link>
          </div>
        </nav>
      </header>
  )
}

export default Header