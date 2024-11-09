import Image from 'next/image'

export default function EventCard() {
  return (
    <div className="max-w-md mx-auto shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src="/eventPoster.webp"
          alt="Event Poster"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm flex items-center">
              <span className="mr-1">📅</span>
              July 15, 2023
            </p>
            <h2 className="text-2xl font-bold">Basketball Tournament</h2>
          </div>
          <button className="px-4 py-2 rounded-lg transition duration-300 bg-white text-black hover:bg-gray-100">
            Join
          </button>
        </div>
    
      </div>
    </div>
  )
}