import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import { Footer } from "~/components/Footer";
import { Nav } from "~/components/Nav";
import Image from "next/image";

import { isAdmin } from "~/utils/isAdmin";
import { api } from "~/utils/api";
import { TutoringSession } from "@prisma/client";
import Link from "next/link";
import { Input } from "~/components/Input";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") return window.open("/", "_self");

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
          <div className="flex flex-col gap-8 px-8 py-16 sm:p-16 xl:px-32">
            {status === "loading" ? (
              <h1>Loading...</h1>
            ) : !isAdmin(session?.user.email) ? (
              <NormalDashboard session={session} />
            ) : (
              <AdminDashboard session={session} />
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

function AdminSession({ session }: { session: TutoringSession }) {
  // const [editMode, setEditMode] = useState(false);

  return (
    <div
      className="flex w-full flex-col rounded-lg bg-white sm:flex-row"
      key={session.id}
    >
      <div className="p-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <p className="text-sm font-bold sm:text-base">{session.label}</p>
          <div
            className={`my-2 flex flex-row items-center gap-2 rounded-full bg-gray-100 px-2 py-1 text-xs sm:my-0 ${session.booked ? "bg-yellow-200" : "bg-green-200"}`}
          >
            <span
              className={`h-3 w-3 rounded-full ${session.booked ? "bg-yellow-400" : "bg-green-400"}`}
            ></span>
            <span>{session.booked ? "Booked" : "Open"}</span>
          </div>
        </div>
        <div className="flex flex-row gap-2 text-[10px] font-semibold">
          <p className="flex flex-row items-center gap-1">
            <Image width={10} height={10} alt="" src="/clock.svg" />
            <span>
              {session.date} {session.time}
            </span>
          </p>
          <p className="flex flex-row items-center gap-1">
            <Image width={10} height={10} alt="@" src="map-pin.svg" />
            <span>{session.location}</span>
          </p>
        </div>
      </div>
      <Link
        href={`/dashboard/session/${session.id}`}
        className="flex flex-row items-center justify-center gap-2 rounded-b-lg bg-red-600 px-2 py-3 text-xs font-semibold text-white shadow-lg duration-100 hover:gap-4 sm:ml-auto sm:justify-normal sm:rounded-r-lg sm:rounded-bl-none sm:py-4 sm:shadow-none md:px-8 2xl:px-4 2xl:text-base"
      >
        <span>Edit</span>
        <Image src="/chevron-right.svg" alt="&gt;" height={16} width={16} />
      </Link>
    </div>
  );
}

function AdminDashboard({ session }: { session: Session | null }) {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isListOpen, setListOpen] = useState(true);

  const date = new Date();
  const month = months[date.getMonth()];

  const [createLabel, setCreateLabel] = useState("Math Tutoring - One on One");
  const [createLocation, setCreateLocation] = useState("2801 Orange St NLR");
  const [createDate, setCreateDate] = useState(`${month} ${date.getDate()}`);
  const [createTime, setCreateTime] = useState("5-7:00pm");

  const createMutation = api.session.create.useMutation();
  const { data: sessions } = api.session.list.useQuery();

  const createSession = () => {
    setCreateLabel("");
    setCreateLocation("");
    setCreateDate("");
    setCreateTime("");

    createMutation.mutate({
      label: createLabel,
      location: createLocation,
      date: createDate,
      time: createTime,
    });

    setCreateOpen(false);
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
        <p className="text-sm text-white">
          You are currently signed in as {session?.user.email} -{" "}
          <a className="cursor-pointer underline" onClick={() => signOut()}>
            Sign Out
          </a>
        </p>
      </div>
      <div className="flex flex-col overflow-hidden rounded-lg bg-blue-900">
        <div
          className="flex cursor-pointer flex-row items-center rounded-t-lg p-4"
          onClick={() => setCreateOpen(!isCreateOpen)}
        >
          <p className="font-semibold text-white">Create a new session</p>
          {isCreateOpen ? (
            <Image
              src="/chevron-up.svg"
              alt="Open"
              className="ml-auto h-4"
              height={16}
              width={16}
            />
          ) : (
            <Image
              src="/chevron-down.svg"
              alt="Open"
              className="ml-auto h-4"
              height={16}
              width={16}
            />
          )}
        </div>
        {isCreateOpen && (
          <div className="flex flex-col gap-2 rounded-b-lg px-4 pb-4">
            <Input
              placeholder="Label (Math Tutoring - One on One)"
              value={createLabel}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setCreateLabel(event.target.value)
              }
            />
            <Input
              placeholder="Location (2801 Orange St NLR)"
              value={createLocation}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setCreateLocation(event.target.value)
              }
            />
            <Input
              placeholder={`Date (${month} ${date.getDate()})`}
              value={createDate}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setCreateDate(event.target.value)
              }
            />
            <Input
              placeholder="Time (5-7:00pm)"
              value={createTime}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setCreateTime(event.target.value)
              }
            />
            <button
              className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
              onClick={() => createSession()}
            >
              Create Session
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col overflow-hidden rounded-lg bg-blue-900">
        <div
          className="flex cursor-pointer flex-row items-center rounded-t-lg p-4"
          onClick={() => setListOpen(!isListOpen)}
        >
          <p className="font-semibold text-white">Sessions List</p>
          {isListOpen ? (
            <Image
              src="/chevron-up.svg"
              alt="Open"
              className="ml-auto h-4"
              height={16}
              width={16}
            />
          ) : (
            <Image
              src="/chevron-down.svg"
              alt="Open"
              className="ml-auto h-4"
              height={16}
              width={16}
            />
          )}
        </div>
        {isListOpen && (
          <div className="flex flex-col gap-2 rounded-b-lg px-4 pb-4">
            {sessions?.map((sess) => (
              <AdminSession session={sess} key={sess.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
function NormalDashboard({ session }: { session: Session | null }) {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Customer Dashboard
        </h1>
        <p className="text-sm text-white">
          You are currently signed in as {session?.user.email} -{" "}
          <a className="cursor-pointer underline" onClick={() => signOut()}>
            Sign Out
          </a>
        </p>
      </div>
    </>
  );
}
