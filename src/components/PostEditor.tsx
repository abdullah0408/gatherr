"use client"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { Button } from "@/components/ui/button"
import "./styles.css"
import UserProfilePicture from "@/components/UserProfilePicture"
import submitPost from "@/lib/submitPost"
import { useAuth } from "@/hooks/useAuth";


const PostEditor = () => {
    
  const { userDetails } = useAuth();

  const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false
            }),
            Placeholder.configure({
                placeholder: "What's on your mind?"
            })
        ]
    })

    const input = editor?.getText({
        blockSeparator: "\n",
    }) || ""

    async function onSubmit() {
        await submitPost(input)
        editor?.commands.clearContent()
    }
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
        <div className="flex gap-5">
        <UserProfilePicture className="hidden sm:inline" profilePictureUrl={userDetails?.profilePicture} size={40} />
        
        <EditorContent
        editor={editor}
        className="w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3"
        />
        </div>
        <div className="flex justify-end">
            <Button onClick={onSubmit}
            disabled={!input.trim()}
            className="min-w-20"
            >
                Post
            </Button>
        </div>
    </div>
  )
}

export default PostEditor