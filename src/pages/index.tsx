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
import CreatePostWizard from "~/components/CreatePostWizard";
import PostView from "~/components/PostView";
import Loading from "~/components/Loading";
import LoadingPage from "~/components/LoadingPage";

const Home: NextPage = () => {
  const { data, isError, isLoading } = api.post.getAll.useQuery();
  // const hello = api.post.hello.useQuery({text: "Mounir"});
  // console.log(hello.data?.greeting);
  console.table(data);
  const user = useUser();

  if (!user.isLoaded) return <LoadingPage />;

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
              <div className="flex flex-grow items-center justify-between gap-2">
                <CreatePostWizard />
              </div>
            ) : (
              <div>
                <SignInButton />
              </div>
            )}
          </div>
          <div>
            {isLoading && (
              <div className="grid h-48 place-content-center">
                <Loading />
              </div>
            )}
            {isError && (
              <div className="grid h-48 place-content-center">
                <p>DB is down boi 😐 ❌</p>
              </div>
            )}
            {data?.map(({ post, author }) => (
              <PostView key={post.id} post={post} author={author} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
