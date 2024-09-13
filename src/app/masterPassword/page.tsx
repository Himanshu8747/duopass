'use client'
import React, { useState } from 'react';
import { LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MasterPasswordEntry() {
  const [masterPassword, setMasterPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const VALID_MASTER_PASSWORD = 'myStrongPassword'; 

    if (masterPassword === VALID_MASTER_PASSWORD) {
      localStorage.setItem('masterPasswordValidated', 'true'); 
      router.push('/dashboard');
    } else {
      setError('Incorrect master password!');
      setMasterPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <LockIcon className="mx-auto h-12 w-12 text-indigo-400" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Enter your master password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="master-password" className="sr-only">
                Master Password
              </label>
              <input
                id="master-password"
                name="master-password"
                type={showPassword ? 'text' : 'password'}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Master Password"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Unlock Vault
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
