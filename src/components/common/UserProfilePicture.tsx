import { cn } from "@/lib/utils"
import Image from "next/image"
// import profilePicturePlaceholder from "../assets/avatar-placeholder.png"
import { StaticImageData } from 'next/image';


interface UseProfilePictureProps {
    profilePictureUrl: string | null | undefined | StaticImageData
    size?: number
    className?: string
}
const UserProfilePicture = (
    { profilePictureUrl, size, className }: UseProfilePictureProps
) => {
  return (
    <Image
    src={profilePictureUrl || '/avatar-placeholder.png'}
    alt="Profile Picture"
    width={size || 48}
    height={size || 48}
    className={cn('aspect-square h-fit flex-none rounded-full bg-secondary object-cover', className)}
    />
  )
}

export default UserProfilePicture