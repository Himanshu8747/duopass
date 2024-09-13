'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LockIcon, ShieldIcon, KeyIcon, RefreshCwIcon } from 'lucide-react'

const encryptionMethods = [
  {
    name: 'bcrypt',
    icon: <LockIcon className="w-6 h-6" />,
    description: 'Adaptive hash function based on the Blowfish cipher. Slow by design to prevent brute-force attacks.',
  },
  {
    name: 'Argon2',
    icon: <ShieldIcon className="w-6 h-6" />,
    description: 'Memory-hard function designed to be resistant against GPU cracking attacks. Winner of the Password Hashing Competition.',
  },
  {
    name: 'PBKDF2',
    icon: <KeyIcon className="w-6 h-6" />,
    description: 'Key derivation function that applies a pseudorandom function to the input password along with a salt value and repeats the process many times.',
  },
  {
    name: 'scrypt',
    icon: <RefreshCwIcon className="w-6 h-6" />,
    description: 'Memory-hard key derivation function designed to make it costly to perform large-scale custom hardware attacks.',
  },
]

export default function EncryptionMethods() {
  const [selectedMethod, setSelectedMethod] = useState(encryptionMethods[0])

  return (
    <div className="text-white p-8 mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Password Encryption Methods Used By DuoPass</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black bg-opacity-30 p-6 rounded-xl backdrop-blur-lg">
            <div className="space-y-4">
              {encryptionMethods.map((method) => (
                <motion.button
                  key={method.name}
                  className={`w-full text-left p-4 rounded-lg flex items-center space-x-4 transition-colors ${
                    selectedMethod.name === method.name
                      ? 'bg-indigo-600'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedMethod(method)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-indigo-500 p-2 rounded-full">{method.icon}</div>
                  <span className="font-medium">{method.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
          <motion.div
            key={selectedMethod.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black bg-opacity-30 p-6 rounded-xl backdrop-blur-lg"
          >
            <h3 className="text-xl font-semibold mb-4">How it works</h3>
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-indigo-500 p-2 rounded-full">{selectedMethod.icon}</div>
              <span className="text-2xl font-bold">{selectedMethod.name}</span>
            </div>
            <p className="text-gray-300 text-lg">{selectedMethod.description}</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}