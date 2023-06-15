import { useUser } from "@clerk/nextjs";
import { UserButton, SignOutButton } from "@clerk/nextjs";

export default function CreatePostWizard() {
  const user = useUser();
  if (!user.isSignedIn) {
    return null;
  }

  return (
    <div className="flex w-full items-center gap-4">
      <UserButton />
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
