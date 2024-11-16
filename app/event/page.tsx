import Image from "next/image";

export default function Page() {
  const posterImage = (
    <Image
      src="/eventPoster.webp"
      alt="Event Poster"
      layout="fill"
      objectFit="cover"
    />
  );
  const date = "July 15, 2023";
  const title = "Basketball Tournament";
  const prizePool = { 1: 2000, 2: 1000, 3: 500 };
  const organizer = {
    imgSrc: "/fibaLogo.jpg",
    name: "FIBA (International Basketball Federation)",
    tag: "@FIBA",
    verified: false,
  };
  const description = "Join the fun It's a music festival that will be ...";
  const address = {
    url: "https://www.google.com/maps/place/Madison+Square+Garden/@40.7505,-73.9934,17z/data=!3m14b14m53m41s0x89c259a9d0f7c04b:0xaca00b9679dcbba08m23d40.75054d-73.9916",
    title: "Madison Square Garden",
  };

  return (
    <div className="max-w-md mx-auto shadow-lg rounded-lg overflow-hidden ">
      <div className="relative h-48">{posterImage}</div>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm flex items-center">
              <span className="mr-1">📅</span>
              {date}
            </p>
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          <button className="px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-100">
            Join
          </button>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Prize Pool</h3>
          <ul className="list-disc list-inside">
            <li>1st Place: RM {prizePool[1]}</li>
            <li>2nd Place: RM {prizePool[2]}</li>
            <li>3rd Place: RM {prizePool[3]}</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Organizer</h3>
          <div className="flex items-center space-x-2">
            <Image
              src={organizer.imgSrc} // Replace with the actual avatar URL
              alt="Organizer Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-bold text-lg">{organizer.name}</p>
              <p className="text-sm flex items-center">
                <span>{organizer.tag}</span>
                {organizer.verified ? (
                  <span className="text-blue-600 ml-1">Verified</span>
                ) : (
                  <span className="text-yellow-600 ml-1">Third Party</span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Description</h3>
          <p>{description}</p>
        </div>
        <div className="pt-4">
          <a href={address.url} target="_blank" rel="noopener noreferrer">
            <p className="flex items-center">
              <span className="mr-1">📍</span>
              {address.title}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
