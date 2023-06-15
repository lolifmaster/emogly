import React from "react";
import { RouterOutputs } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

type PostWithAuthor = RouterOutputs["post"]["getAll"][number];

export default function PostView(props: PostWithAuthor) {
  const { post, author } = props;
  return (
    <div key={post.id} className="border-b border-gray-400 p-8">
      <div className="flex items-center gap-4">
        <img
          src={author?.profileImageUrl}
          alt={author?.username!}
          className="h-12 w-12 rounded-full"
        />
        <div className="flex flex-col">
          <div className="text-slate-200">
            <span>@{author?.username} · </span>
            <span className="font-thin">{dayjs(post.createdAt).fromNow()}</span>
          </div>
          <span>{post.content}</span>
        </div>
      </div>
    </div>
  );
}
