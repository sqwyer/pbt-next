import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export function Nav() {
  const { data: sessionData } = useSession();
  const [navIsOpen, setNavIsOpen] = useState(false);

  return (
    <div
      className={`flex flex-col bg-white ${navIsOpen && "gap-4"} sticky top-0 z-50 px-8 py-4 shadow-lg sm:px-16 md:gap-0 xl:px-32`}
    >
      <div className="flex flex-row items-center">
        <Link href="/">
          {/* <Image src="/textmark.png" alt="Pulliam-Bivens Tutoring" height={32} width={128} /> */}
          <p className={`text-2xl ${bebas.className}`}>
            <span className="text-blue-800">Pulliam-Bivens</span> Tutoring
          </p>
        </Link>
        <div className="ml-auto hidden flex-row items-center gap-6 md:flex md:gap-8 lg:gap-12">
          <a className="cursor-pointer text-sm font-semibold text-black hover:underline">
            Meet the Tutors
          </a>
          <a className="cursor-pointer text-sm font-semibold text-black hover:underline">
            Testimonies
          </a>
          {sessionData ? (
            <Link
              className="cursor-pointer text-sm font-semibold text-black hover:underline"
              href="/dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <a
              className="cursor-pointer text-sm font-semibold text-black hover:underline"
              onClick={() => signIn("google")}
            >
              Sign In
            </a>
          )}
          <button className="flex flex-row items-center gap-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white duration-100 hover:-ml-1 hover:gap-5">
            <span>Book Us</span>
            <Image src="/chevron-right.svg" alt="&gt;" height={16} width={16} />
          </button>
        </div>
        <div className="ml-auto flex font-extrabold text-red-600 md:hidden">
          {navIsOpen ? (
            <Image
              src="/x.svg"
              alt="Close Menu"
              height={16}
              width={16}
              onClick={() => setNavIsOpen(false)}
              className="cursor-pointer"
            />
          ) : (
            <Image
              src="/menu.svg"
              alt="Open Menu"
              height={16}
              width={16}
              onClick={() => setNavIsOpen(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      {navIsOpen && (
        <div className="flex flex-col gap-2 md:hidden">
          <a className="block cursor-pointer rounded-md bg-gray-50 px-3 py-2 font-semibold text-black hover:underline">
            Meet the Tutors
          </a>
          <a className="block cursor-pointer rounded-md bg-gray-50 px-3 py-2 font-semibold text-black hover:underline">
            Testimonies
          </a>
          {sessionData ? (
            <Link
              className="block cursor-pointer rounded-md bg-gray-50 px-3 py-2 font-semibold text-black hover:underline"
              href="/dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <a
              className="block cursor-pointer rounded-md bg-gray-50 px-3 py-2 font-semibold text-black hover:underline"
              onClick={() => signIn("google")}
            >
              Sign In
            </a>
          )}
          <button className="flex flex-row items-center justify-center gap-2 rounded-md bg-red-600 px-3 py-2 font-semibold text-white">
            <span>Book Us</span>
            <Image src="/chevron-right.svg" alt="&gt;" height={16} width={16} />
          </button>
        </div>
      )}
    </div>
  );
}
