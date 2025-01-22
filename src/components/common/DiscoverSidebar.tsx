import React from "react";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import FriendSuggesstions from "../FriendSuggesstions";

const DiscoverSidebar = () => {
  return (
    // <div className="sticky top-[5.25] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">

    // <MenuBar className=""/>
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none rounded-xl space-y-5 bg-card shadow-sm md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <FriendSuggesstions />
        {/* <TrendingTopics /> */}
      </Suspense>
    </div>
  );
};

export default DiscoverSidebar;
