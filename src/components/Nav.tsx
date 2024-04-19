import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image"
import Link from 'next/link'
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
    weight: '400',
    subsets: ["latin"]
})

export function Nav() {
    const { data: sessionData } = useSession();
    const [navIsOpen, setNavIsOpen] = useState(false);

    return (
        <div className={`bg-white flex flex-col ${navIsOpen && "gap-4"} shadow-lg md:gap-0 px-8 sm:px-16 xl:px-32 py-4 sticky top-0 z-50`}>
            <div className="flex flex-row items-center">
                <Link href="/">
                    {/* <Image src="/textmark.png" alt="Pulliam-Bivens Tutoring" height={32} width={128} /> */}
                    <p className={`text-2xl ${bebas.className}`}><span className="text-blue-800">Pulliam-Bivens</span> Tutoring</p>
                </Link>
                <div className="hidden md:flex flex-row gap-6 md:gap-8 lg:gap-12 ml-auto items-center">
                    <a className="text-sm text-black font-semibold cursor-pointer hover:underline">Meet the Tutors</a>
                    <a className="text-sm text-black font-semibold cursor-pointer hover:underline">Testimonies</a>
                    {sessionData
                        ? <Link className="text-sm text-black font-semibold cursor-pointer hover:underline" href="/dashboard">Dashboard</Link>
                        : <a className="text-sm text-black font-semibold cursor-pointer hover:underline" onClick={() => signIn("google")}>Sign In</a>
                    }
                    <button className="bg-red-600 font-semibold text-white px-4 py-2 flex flex-row items-center gap-4 rounded-lg hover:gap-5 hover:-ml-1 duration-100">
                        <span>Book Us</span>
                        <Image src="/chevron-right.svg" alt="&gt;" height={16} width={16} />
                    </button>
                </div>
                <div className="flex md:hidden ml-auto text-red-600 font-extrabold">
                    {navIsOpen 
                        ? <Image src="/x.svg" alt="Close Menu" height={16} width={16} onClick={() => setNavIsOpen(false)} className="cursor-pointer" />
                        : <Image src="/menu.svg" alt="Open Menu" height={16} width={16} onClick={() => setNavIsOpen(true)} className="cursor-pointer" />
                    }
                </div>
            </div>
            {navIsOpen && <div className="md:hidden flex flex-col gap-2">
                <a className="text-black font-semibold cursor-pointer hover:underline block bg-gray-50 px-3 py-2 rounded-md">Meet the Tutors</a>
                <a className="text-black font-semibold cursor-pointer hover:underline block bg-gray-50 px-3 py-2 rounded-md">Testimonies</a>
                {sessionData
                        ? <Link className="text-black font-semibold cursor-pointer hover:underline block bg-gray-50 px-3 py-2 rounded-md" href="/dashboard">Dashboard</Link>
                        : <a className="text-black font-semibold cursor-pointer hover:underline block bg-gray-50 px-3 py-2 rounded-md" onClick={() => signIn("google")}>Sign In</a>
                    }
                <button className="bg-red-600 text-white font-semibold flex flex-row gap-2 py-2 px-3 justify-center items-center rounded-md">
                    <span>Book Us</span>
                    <Image src="/chevron-right.svg" alt="&gt;" height={16} width={16} />
                </button>
            </div>}
        </div>
    )
}