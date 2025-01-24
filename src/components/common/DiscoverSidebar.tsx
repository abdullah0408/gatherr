import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import FriendSuggestions from "../FriendSuggesstions"
import TrendingTopics from "../TrendingTopics";

const DiscoverSidebar = () => {
  return (
    <>
      <style>
        {`
          /* Hides the scrollbar across browsers */
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          .scrollbar-hide {
            -ms-overflow-style: none; /* For IE and Edge */
            scrollbar-width: none;    /* For Firefox */
          }
        `}
      </style>
      <div className="h-screen sticky top-[5.25rem] rounded-xl hidden w-72 flex-none space-y-5 shadow-sm overflow-y-auto scrollbar-hide md:block lg:w-80">
        <div className="bg-card rounded-xl">
          <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
            <FriendSuggestions />
          </Suspense>
        </div>
        
        <div className="bg-card rounded-xl">
          <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
            <TrendingTopics />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default DiscoverSidebar;
