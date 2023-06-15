import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { api } from "~/utils/api";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Home: NextPage = () => {
  const { data, isError, isLoading } = api.post.getAll.useQuery();
  // const hello = api.post.hello.useQuery({text: "Mounir"});
  // console.log(hello.data?.greeting);

  const user = useUser();

  if (isError)
    return (
      <div className="grid h-48 place-content-center">
        <p>Dzair is down boi 😐 ❌</p>
      </div>
    );

  if (isLoading)
    return (
      <div className="grid h-48 place-content-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <Head>
        <title>EMOGLY</title>
        <meta name="description" content="EMOGLY your fav new plateform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-gray-500 md:max-w-4xl">
          <div className="flex border-b border-gray-500 p-4">
            {user.isSignedIn ? (
              <div className="flex flex-1 items-center justify-between">
                <div className="flex gap-2">
                  <UserButton />
                  <p className="text-2xl font-bold text-white">
                    {user.user.fullName}
                  </p>
                </div>
                <SignOutButton>
                  <button className="rounded-full border border-gray-400 px-4 py-2 font-bold text-white transition hover:bg-blue-300 hover:text-black">
                    <p>Log Out</p>
                  </button>
                </SignOutButton>
              </div>
            ) : (
              <div>
                <SignInButton />
              </div>
            )}
          </div>
          <div>
            {data?.map((post) => (
              <div key={post.id} className="border-b border-gray-400 p-8">
                <p className="text-4xl font-bold text-white">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
