'use client'
import React, { useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { LockIcon, EyeIcon, EyeOffIcon, PlusIcon, SearchIcon, CopyIcon, TrashIcon, UploadIcon, EditIcon } from 'lucide-react'

type Password = {
  id: number
  name: string
  username: string
  password: string
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState<string>('') // Search term state
  const [selectedPassword, setSelectedPassword] = useState<number | null>(null) // State for selected password
  const [passwords, setPasswords] = useState<Password[]>([
    { id: 1, name: 'Google', username: 'user@example.com', password: 'strongpassword1' },
    { id: 2, name: 'GitHub', username: 'devuser', password: 'securepass123' },
    { id: 3, name: 'Netflix', username: 'moviebuff', password: 'streamingpass!' },
  ]) // Passwords state
  const [isAddingPassword, setIsAddingPassword] = useState<boolean>(false) // State for adding a new password
  const [newPassword, setNewPassword] = useState<Password>({
    id: 0,
    name: '',
    username: '',
    password: '',
  }) // New password state
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('masterPasswordValidated') === 'true';
    if (!isAuthenticated) {
      router.push('/masterPassword');
    }
  }, [router]);

  // Handle copying password to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  // Handle file import for passwords
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const importedPasswords: Password[] = JSON.parse(e.target?.result as string)
          setPasswords([...passwords, ...importedPasswords])
        } catch (error) {
          console.error('Error importing passwords:', error)
          // Show an error message to the user
        }
      }
      reader.readAsText(file)
    }
  }

  // Handle adding a new password
  const handleAddPassword = () => {
    if (newPassword.name && newPassword.username && newPassword.password) {
      setPasswords([...passwords, { ...newPassword, id: Date.now() }])
      setNewPassword({ id: 0, name: '', username: '', password: '' })
      setIsAddingPassword(false)
    }
  }

  // Handle deleting a password
  const handleDeletePassword = (id: number) => {
    setPasswords(passwords.filter(password => password.id !== id))
  }

  // Filter passwords based on search term
  const filteredPasswords = passwords.filter(password =>
    password.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <LockIcon className="mr-2 text-indigo-400" /> Duopass
          </h1>
          <div className="flex space-x-4">
            {/* Import Passwords Button */}
            <label className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center cursor-pointer">
              <UploadIcon className="mr-2" /> Import Passwords
              <input type="file" className="hidden" onChange={handleImport} accept=".json,.csv" />
            </label>
            {/* Add Password Button */}
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center"
              onClick={() => setIsAddingPassword(true)}
            >
              <PlusIcon className="mr-2" /> Add Password
            </button>
          </div>
        </header>

        {/* Search Input */}
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search passwords..."
              className="w-full bg-slate-700 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search passwords"
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          {/* Add New Password Form */}
          {isAddingPassword && (
            <div className="mb-6 bg-slate-700 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Add New Password</h3>
              <input
                type="text"
                placeholder="Site Name"
                className="w-full bg-slate-600 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newPassword.name}
                onChange={(e) => setNewPassword({...newPassword, name: e.target.value})}
                aria-label="Site Name"
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-slate-600 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newPassword.username}
                onChange={(e) => setNewPassword({...newPassword, username: e.target.value})}
                aria-label="Username"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-slate-600 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newPassword.password}
                onChange={(e) => setNewPassword({...newPassword, password: e.target.value})}
                aria-label="Password"
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                  onClick={() => setIsAddingPassword(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                  onClick={handleAddPassword}
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* Password List */}
          <ul className="space-y-4">
            {filteredPasswords.length > 0 ? (
              filteredPasswords.map((password) => (
                <li key={password.id} className="bg-slate-700 p-4 rounded-md hover:bg-slate-600 transition duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{password.name}</h3>
                      <p className="text-sm text-gray-300">{password.username}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedPassword(selectedPassword === password.id ? null : password.id)}
                        className="text-indigo-400 hover:text-indigo-300 transition duration-300"
                        aria-label={selectedPassword === password.id ? "Hide password" : "Show password"}
                      >
                        {selectedPassword === password.id ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                      <button
                        onClick={() => handleCopy(password.password)}
                        className="text-indigo-400 hover:text-indigo-300 transition duration-300"
                        aria-label="Copy password"
                      >
                        <CopyIcon />
                      </button>
                      <button
                        className="text-indigo-400 hover:text-indigo-300 transition duration-300"
                        aria-label="Edit password"
                      >
                        <EditIcon />
                      </button>
                      <button 
                        className="text-red-400 hover:text-red-300 transition duration-300"
                        onClick={() => handleDeletePassword(password.id)}
                        aria-label="Delete password"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                  {selectedPassword === password.id && (
                    <div className="mt-2 text-sm bg-slate-800 p-2 rounded">
                      {password.password}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className="bg-slate-700 p-4 rounded-md text-center">No passwords found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
