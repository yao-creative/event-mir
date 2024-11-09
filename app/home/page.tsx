import EventCard from "@/components/EventCard";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/event"><EventCard /></Link>
    </div>
  );
}
