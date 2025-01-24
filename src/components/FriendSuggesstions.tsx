import Link from "next/link";
import {Button} from "./ui/button";
import UserProfilePicture from "./UserProfilePicture";
import getFriendSuggestions from "@/lib/getFriendSuggestions";

const FriendSuggesstions = async () => {
    const toFollow = await getFriendSuggestions(4);

    return (
        <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
          <div className="text-xl font-bold">Who to follow.</div>
          {toFollow ? toFollow.map((user) => (
            <div key={user.id} className="flex items-center justify-between gap-3">
              <Link
                href={`/users/${user.username}`}
                className="flex items-center gap-3"
              >
                <UserProfilePicture
                  className="flex-none"
                  profilePictureUrl={user.profilePicture}
                />
                <div>
                  <p className="line-clamp-1 break-all font-semibold text-muted-foreground">
                    {user.name}
                  </p>
                  <p className="line-clamp-1 break-all text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </Link>
              <Button className="">Follow</Button>
            </div>
          )) : (<p>No users to follow</p>)}
        </div>
      );
}

export default FriendSuggesstions