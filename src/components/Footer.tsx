import Image from "next/image"

export function Footer() {
    return <footer className="bg-blue-900 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:gap-6 py-8 px-8 sm:px-16 xl:px-32">
            <div className="flex flex-col gap-1 flex-1">
                <h1 className="font-bold sm:text-lg">PB Tutoring</h1>
                <p className="text-xs sm:text-sm italic">Mathematics tutoring for students by students</p>
            </div>
            <div className="flex flex-col gap-2 md:gap-1 flex-1">
                <h2 className="font-semibold">Pages</h2>
                <a className="text-sm bg-black bg-opacity-10 p-2 px-4 rounded-lg md:rounded-none md:p-0 md:bg-transparent md:text-blue-100 cursor-pointer hover:underline">Meet the Tutors</a>
                <a className="text-sm bg-black bg-opacity-10 p-2 px-4 rounded-lg md:rounded-none md:p-0 md:bg-transparent md:text-blue-100 cursor-pointer hover:underline">Testimonies</a>
            </div>
            <div className="flex flex-col gap-2 md:gap-1 flex-1">
                <h2 className="font-semibold">Contact Us</h2>
                <a className="text-sm bg-black bg-opacity-10 p-2 px-4 rounded-lg md:rounded-none md:p-0 md:bg-transparent md:text-blue-100 cursor-pointer hover:underline flex flex-row gap-1 items-center md:gap-0" href="mailto:jbpulliam06@gmail.com?cc=sawyerbivens06@gmail.com">
                    <Image src="/mail.svg" alt="" height={12} width={12} className="h-3 md:hidden" />
                    <span>jbpulliam06@gmail.com</span>
                </a>
                <a className="text-sm bg-black bg-opacity-10 p-2 px-4 rounded-lg md:rounded-none md:p-0 md:bg-transparent md:text-blue-100 cursor-pointer hover:underline flex flex-row gap-1 items-center md:gap-0" href="mailto:sawyerbivens06@gmail.com?cc=jbpulliam06@gmail.com">
                    <Image src="/mail.svg" alt="" height={12} width={12} className="h-3 md:hidden" />
                    <span>sawyerbivens06@gmail.com</span>
                </a>
            </div>
        </div>
        <div className="bg-blue-950 text-white py-4 px-8 sm:px-16 xl:px-32">
            &copy; {new Date().getFullYear()} all rights reserved.
        </div>
    </footer>
}