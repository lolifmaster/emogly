import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

type PostWithAuthor = RouterOutputs["post"]["getAll"][number];

export default function PostView(props: PostWithAuthor) {
  const { post, author } = props;
  return (
    <div key={post.id} className="border-b border-gray-400 p-8">
      <div className="flex items-center gap-4">
        <Image
          src={author.profileImageUrl}
          width={48}
          height={48}
          alt={author.username}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <div className="text-slate-200">
            <span>@{author.username} · </span>
            <span className="font-thin">{dayjs(post.createdAt).fromNow()}</span>
          </div>
          <span className="text-2xl">{post.content}</span>
        </div>
      </div>
    </div>
  );
}
