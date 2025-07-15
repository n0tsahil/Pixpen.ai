import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react'

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      // Deep clone to make it mutable
      const data = dummyPublishedCreationData.map(item => ({ ...item }))
      setCreations(data)
    }
  }, [user])

  const toggleLike = (index) => {
    setCreations((prev) => {
      const updated = [...prev]
      const likes = updated[index].likes || []

      if (likes.includes(user.id)) {
        // Remove like
        updated[index].likes = likes.filter((id) => id !== user.id)
      } else {
        // Add like
        updated[index].likes = [...likes, user.id]
      }

      return updated
    })
  }

  return (
<div className="flex-1 h-full flex flex-col gap-4 p-6">
  <h2 className="text-lg font-semibold text-gray-800">Creations</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {creations.map((creation, index) => (
      <div key={index} className="relative group w-full p-1">
        <div className="relative w-full h-full">
          <img
            src={creation.content}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-sm hidden group-hover:block">
              {creation.prompt}
            </p>
            <div className="flex gap-1 items-center">
              <p>{creation.likes.length}</p>
              <Heart
                onClick={() => toggleLike(index)}
                className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                  creation.likes.includes(user.id)
                    ? 'fill-red-500 text-red-600'
                    : 'text-white'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default Community
