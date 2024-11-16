import Image from 'next/image';
import { Event } from "@/app/interfaces/event";

interface Props {
  data: Event;
}

export default function EventCard({ data }: Props) {
  return (
    <div className="max-w-md mx-auto shadow-lg rounded-lg overflow-hidden h-96">
      <div className="relative h-48">
        <Image
          src="/eventPoster.webp"
          alt="Event Poster"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6 space-y-6 h-48 overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm flex items-center">
              <span className="mr-1">📅</span>
              {data.dateofevent}
            </p>
            <h2 className="text-2xl font-bold truncate">{data.title}</h2>
          </div>
          <button className="px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-100">
            Join
          </button>
        </div>
        <div className="space-y-1 overflow-hidden">
          <div className="flex items-center space-x-2">
            <Image
              src="/fibaLogo.jpg" // Replace with the actual avatar URL
              alt="Organizer Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-bold text-lg truncate">{data.organizerid}</p>
              <p className='text-sm flex items-center truncate'>
                <span>@{data.organizerid}</span> 
                <span className='text-blue-600 ml-1'>Verified</span> 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}