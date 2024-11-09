import Image from 'next/image'

export default function EventCard() {
  return (
    <div className="max-w-md mx-auto shadow-lg rounded-lg overflow-hidden bg-gray-900">
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
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Image
              src="/fibaLogo.jpg" // Replace with the actual avatar URL
              alt="Organizer Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-bold text-lg">FIBA (International Basketball Federation)</p>
              <p className="text-sm flex items-center">
                <span>@FIBA</span>
                <span className='text-green-500 ml-1'>✔️</span> 
              </p>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  )
}