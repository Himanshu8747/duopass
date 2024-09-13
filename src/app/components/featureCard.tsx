import React from 'react'

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="flex justify-center mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      )
}

export default FeatureCard