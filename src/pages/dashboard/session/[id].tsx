import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, HTMLProps, useLayoutEffect, useState } from "react";
import { Input } from "~/components/Input";
import { Nav } from "~/components/Nav";
import { api } from "~/utils/api";
import { isAdmin } from "~/utils/isAdmin";
import Link from "next/link";
import { CheckboxInput } from "~/components/CheckboxInput";
import { TutoringSession } from "@prisma/client";
import Image from "next/image";

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

export default function SessionEditor() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: userSession, status: userStatus } = useSession();
  const { data: session, status } = api.session.find.useQuery({
    id: router.query.id as string,
  });

  useLayoutEffect(() => {
    if (userStatus == "unauthenticated") redirect("/");
    if (userStatus == "authenticated") {
      if (!isAdmin(userSession.user.email)) redirect("/");
    }
  }, []);

  const deleteMutation = api.session.delete.useMutation();

  const deleteSession = () => {
    deleteMutation.mutate({
      id: session?.id as string,
    });
    window.open("/dashboard", "_self");
  };

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
            {status === "pending" && <p className="text-white">Loading...</p>}
            {status === "error" && (
              <div className="flex flex-col gap-2 text-white">
                <p>Couldn&apos;t load session...</p>
                <Link
                  href="/dashboard"
                  className="cursor-pointer text-white underline"
                >
                  Back to dashboard
                </Link>
              </div>
            )}
            {status === "success" && (
              <>
                <Link href="/dashboard" className="flex flex-row gap-1">
                  <Image
                    src="/chevron-left.svg"
                    className="cursor-pointer"
                    height={16}
                    width={16}
                    alt="&lt;"
                  />
                  <span className="text-white underline">
                    Back to dashboard
                  </span>
                </Link>
                <div className="flex flex-col gap-4 rounded-lg bg-blue-900 p-4">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      Currently editing session &quot;{session?.label}&quot;
                    </p>
                    <p className="text-xs text-white">({session?.id})</p>
                  </div>
                  <SessionForm
                    session={session as TutoringSession}
                    openModal={() => setModalOpen(true)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <div
        className={`modal-bg fixed bottom-0 left-0 right-0 top-0 z-[99] flex items-center justify-center bg-black bg-opacity-50 p-8 sm:px-16 ${!modalOpen && "hidden"}`}
        onClick={(event) =>
          setModalOpen(
            !(event.target as HTMLDivElement).classList.contains("modal-bg"),
          )
        }
      >
        <div className="modal z-[98] flex w-full flex-col rounded-[10px] bg-white sm:w-96">
          <div className="flex flex-col gap-4 rounded-t-lg border-2 border-b-0 border-gray-400 p-4 text-sm">
            <p>Are you sure you want to delete this session?</p>
            <div className="flex flex-col gap-1">
              <p>
                • Labeled as <span className="font-bold">{session?.label}</span>
              </p>
              <p>
                • Located as{" "}
                <span className="font-bold">{session?.location}</span>
              </p>
              <p>
                • Scheduled for{" "}
                <span className="font-bold">{session?.date}</span> at{" "}
                <span className="font-bold">{session?.time}</span>
              </p>
            </div>
            <p>
              This action is <span className="font-bold">NOT</span> able to be
              undone.
            </p>
            {session?.booked && (
              <div className="flex flex-row gap-1 font-bold text-yellow-500">
                <Image src="/warning.svg" height={14} width={14} alt="/!\" />
                <p>This session is marked as booked.</p>
              </div>
            )}
            {/* NOTE: this button uses modal-bg className to trigger the close event onClick from the true modal-bg */}
            <button className="modal-bg cursor-pointer rounded-sm bg-gray-100 px-2 py-1 underline hover:bg-gray-200">
              Cancel deletion
            </button>
          </div>
          <button
            className="rounded-b-lg border-2 border-red-600 bg-red-100 px-4 py-2 font-semibold text-red-600 duration-75 hover:bg-red-300"
            onClick={() => deleteSession()}
          >
            Yes, delete this session.
          </button>
        </div>
      </div>
    </>
  );
}

interface SessionFormProps extends HTMLProps<HTMLDivElement> {
  session: TutoringSession;
  openModal: () => void;
}

function SessionForm({ session, openModal }: SessionFormProps) {
  const d = new Date();
  const month = months[d.getMonth()];

  const [label, setLabel] = useState(session.label);
  const [location, setLocation] = useState(session.location);
  const [date, setDate] = useState(session.date);
  const [time, setTime] = useState(session.time);
  const [booked, setBooked] = useState(session.booked as boolean);

  const updateMutation = api.session.update.useMutation();

  const updateSession = (id: string) => {
    updateMutation.mutate({
      id,
      data: {
        label,
        location,
        date,
        time,
        booked,
      },
    });
    window.open("/dashboard", "_self");
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        className="rounded-md border border-white border-opacity-15 bg-white bg-opacity-5 p-2 text-white focus:border-opacity-25 focus:bg-opacity-10 focus:outline-none"
        placeholder="Label (Math Tutoring - One on One)"
        value={label}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setLabel(event.target.value)
        }
      />
      <input
        className="rounded-md border border-white border-opacity-15 bg-white bg-opacity-5 p-2 text-white focus:border-opacity-25 focus:bg-opacity-10 focus:outline-none"
        placeholder="Location (2801 Orange St NLR)"
        value={location}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setLocation(event.target.value)
        }
      />
      <input
        className="rounded-md border border-white border-opacity-15 bg-white bg-opacity-5 p-2 text-white focus:border-opacity-25 focus:bg-opacity-10 focus:outline-none"
        placeholder={`Date (${month} ${d.getDate()})`}
        value={date}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setDate(event.target.value)
        }
      />
      <input
        className="rounded-md border border-white border-opacity-15 bg-white bg-opacity-5 p-2 text-white focus:border-opacity-25 focus:bg-opacity-10 focus:outline-none"
        placeholder="Time (5-7:00pm)"
        value={time}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setTime(event.target.value)
        }
      />
      <div className="flex flex-row gap-2">
        <p className="text-white">Booked</p>
        <CheckboxInput
          checked={booked}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setBooked(event.target.checked)
          }
        />
      </div>
      <button
        className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
        onClick={() => updateSession(session?.id)}
      >
        Update Session
      </button>
      <p
        className="cursor-pointer text-sm text-red-400 underline"
        onClick={() => openModal()}
      >
        Delete this session (you cannot undo this action)
      </p>
    </div>
  );
}
