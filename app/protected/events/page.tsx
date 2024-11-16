import Search from "@/components/ui/search";
import React from "react";
import { Suspense } from "react";
export default function Page() {
  return (
    <div>
      <div>
        <Suspense>
          {" "}
          <Search placeholder="search"></Search>
        </Suspense>
      </div>
    </div>
  );
}
