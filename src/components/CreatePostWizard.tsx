import { useUser } from "@clerk/nextjs";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function CreatePostWizard() {
  const user = useUser();
  if (!user.isSignedIn) {
    return null;
  }

  return (
    <div className="flex w-full items-center gap-4">
      <Image
        src={user.user.profileImageUrl}
        width={32}
        height={32}
        alt={user.user.fullName!}
        className="rounded-full"
      />
      <textarea
        placeholder="What is happening?!"
        className="scroll no-scrollbar flex-grow resize-none flex-wrap bg-transparent px-4 py-2 font-bold outline-none"
      />
      <SignOutButton>
        <button className="rounded-full border border-gray-400 px-4 py-2 font-bold text-white transition hover:bg-blue-300 hover:text-black">
          Log Out
        </button>
      </SignOutButton>
    </div>
  );
}
