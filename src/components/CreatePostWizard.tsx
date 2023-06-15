import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import Loading from "./Loading";

export default function CreatePostWizard() {
  const user = useUser();
  const ctx = api.useContext();

  const [data, setData] = useState("");
  const { mutate, isSuccess, isLoading } = api.post.create.useMutation({
    onSuccess: () => {
      ctx.post.getAll.invalidate();
      setData("");
    },
  });

  if (!user.isSignedIn) {
    return null;
  }

  return (
    <>
      <div className="flex w-full items-center gap-4">
        <Image
          src={user.user.profileImageUrl}
          width={32}
          height={32}
          alt={user.user.fullName!}
          className="rounded-full"
        />
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="What is happening?!"
          className="flex-grow flex-wrap bg-transparent px-4 py-2 font-bold outline-none"
        />
        <button
          disabled={isLoading || data.length === 0}
          onClick={() => {
            mutate({ content: data });
          }}
          className={`rounded-full bg-blue-500 px-5 py-2 font-bold text-white transition hover:bg-blue-600 ${
            (isLoading || data.length === 0) && "cursor-not-allowed opacity-50"
          }`}
        >
          {isLoading ? <Loading /> : "Post"}
        </button>
      </div>
    </>
  );
}
