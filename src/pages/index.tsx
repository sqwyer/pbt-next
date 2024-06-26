import Head from "next/head";
import Image from "next/image";
import { Nav } from "~/components/Nav";

import { api } from "~/utils/api";

import { Footer } from "~/components/Footer";
import Link from "next/link";

export default function Home() {
  const { data: sessions, status: sessionsStatus } =
    api.session.list.useQuery();

  return (
    <>
      <Head>
        <title>PB Tutoring</title>
        <meta
          name="description"
          content="Mathematics tutoring with two of the top scoring students from North Little Rock High School."
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <main className="relative flex min-h-screen flex-col justify-between gap-0 bg-blue-800">
        <div>
          <Nav />
          <div className="flex flex-col gap-16 px-8 py-16 sm:gap-24 sm:p-16 xl:flex-row xl:gap-32 xl:px-32 2xl:p-32">
            <div className="flex flex-1 flex-col gap-6 2xl:gap-12">
              <h1 className="text-2xl font-bold text-white lg:text-5xl xl:text-6xl">
                Let&apos;s improve your test scores, together.
              </h1>
              <h2 className="text-md font-semibold text-white lg:text-lg">
                Work with current high school students who has achieved perfect
                ACT and PSAT scores as well as a student with a perfect AP
                Calculus AB score.
              </h2>
              <div className="flex flex-col gap-4 rounded-xl bg-blue-900 p-6 sm:p-8">
                <p className="text text-xs font-semibold italic text-white lg:text-base">
                  &quot;Jonah Pulliam and Sawyer Bivens have been some of my
                  most dedicated and hard-working students. I am sure that they
                  can help improve your mathematical abilities.&quot;
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* <img src={TestimonyPFP} alt="&gt;" className="rounded-full w-12 h-12"></img> */}
                  <div className="flex flex-row items-center gap-2">
                    <p className="md:text-md text-xs font-bold text-white">
                      Bruce Maddox
                    </p>
                    <p className="text-xs font-semibold italic text-blue-100">
                      AP Calculus Teacher
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-1 text-xs font-bold text-yellow-500 sm:text-sm">
                    <Image
                      src="/star.svg"
                      alt="&gt;"
                      height={12}
                      width={12}
                      className="h-3 sm:h-4"
                    />
                    <Image
                      src="/star.svg"
                      alt="&gt;"
                      height={12}
                      width={12}
                      className="h-3 sm:h-4"
                    />
                    <Image
                      src="/star.svg"
                      alt="&gt;"
                      height={12}
                      width={12}
                      className="h-3 sm:h-4"
                    />
                    <Image
                      src="/star.svg"
                      alt="&gt;"
                      height={12}
                      width={12}
                      className="h-3 sm:h-4"
                    />
                    <Image
                      src="/star.svg"
                      alt="&gt;"
                      height={12}
                      width={12}
                      className="h-3 sm:h-4"
                    />
                    <span>(5.0)</span>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-blue-900 sm:hidden" />
            <div className="flex flex-1 flex-col gap-8 sm:gap-4">
              {sessionsStatus === "pending" &&
                [1, 2, 3, 4, 5].map((key) => (
                  <div
                    key={key}
                    className="flex w-full flex-col rounded-lg bg-white"
                  >
                    <div className="flex animate-pulse flex-col gap-2 p-4">
                      <p className="h-4 w-64 rounded-md bg-gray-200" />
                      <div className="flex flex-row gap-4">
                        <p className="h-4 w-24 rounded-md bg-gray-200" />
                        <p className="h-4 w-24 rounded-md bg-gray-200" />
                      </div>
                    </div>
                  </div>
                ))}
              {sessionsStatus === "success" &&
                sessions
                  ?.filter((session) => session.booked === false)
                  .slice(0, 5)
                  .map((session) => (
                    <div
                      className="flex w-full flex-col rounded-lg bg-white sm:flex-row"
                      key={session.id}
                    >
                      <div className="p-4 sm:px-8">
                        <p className="text-sm font-bold sm:text-base">
                          {session.label}
                        </p>
                        <div className="flex flex-row gap-2 text-[10px] font-semibold">
                          <p className="flex flex-row items-center gap-1">
                            <Image
                              width={10}
                              height={10}
                              alt=""
                              src="/clock.svg"
                            />
                            <span>
                              {session.date} {session.time}
                            </span>
                          </p>
                          <p className="flex flex-row items-center gap-1">
                            <Image
                              width={10}
                              height={10}
                              alt="@"
                              src="/map-pin.svg"
                            />
                            <span>{session.location}</span>
                          </p>
                        </div>
                      </div>
                      <button className="flex flex-row items-center justify-center gap-2 rounded-b-lg bg-red-600 px-2 py-3 text-xs font-semibold text-white shadow-lg duration-100 hover:gap-4 sm:ml-auto sm:justify-normal sm:rounded-r-lg sm:rounded-bl-none sm:py-4 sm:shadow-none md:px-8 2xl:px-4 2xl:text-base">
                        <span>Book Now</span>
                        <Image
                          src="/chevron-right.svg"
                          alt="&gt;"
                          height={16}
                          width={16}
                        />
                      </button>
                    </div>
                  ))}
              {sessionsStatus === "error" && (
                <p className="text-white">
                  Error loading sessions...{" "}
                  <Link href="/" className="cursor-pointer underline">
                    try reloading
                  </Link>
                  .
                </p>
              )}
              <p className="cursor-pointer text-sm font-semibold text-white hover:underline">
                See all planned sessions...
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.post.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
