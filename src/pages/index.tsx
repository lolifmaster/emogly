import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

const Home: NextPage = () => {
  const post = api.post.getAll.useQuery();
  const hello = api.post.hello.useQuery({text: "Mounir"});
  console.log(hello.data?.greeting);

  const user = useUser();

  return (
    <>
      <Head>
        <title>EMOGLY</title>
        <meta name="description" content="EMOGLY your fav new plateform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div>
          <SignedIn>
            <UserButton />
            <h1 className="text-white text-4xl font-bold">Hello {user.user?.firstName}</h1>
          </SignedIn>
          <SignedOut>
            <h1 className="text-white text-4xl font-bold">EMOGLY</h1>
            <SignInButton />
          </SignedOut>
        </div>
        <div>
          {post.data?.map((post) => (
            <div key={post.id}>
              <h1 className="text-white text-4xl font-bold">{post.title}</h1>
              <p className="text-white text-4xl font-bold">{post.content}</p>
            </div>
              ))}
        </div>
      </main>
    </>
  );
};

export default Home;
