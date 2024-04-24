import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="flex flex-col gap-4 px-8 py-8 sm:px-16 md:flex-row md:gap-6 xl:px-32">
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="font-bold sm:text-lg">PB Tutoring</h1>
          <p className="text-xs italic sm:text-sm">
            Mathematics tutoring for students by students
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-2 md:gap-1">
          <h2 className="font-semibold">Pages</h2>
          <a className="cursor-pointer rounded-lg bg-black bg-opacity-10 p-2 px-4 text-sm hover:underline md:rounded-none md:bg-transparent md:p-0 md:text-blue-100">
            Meet the Tutors
          </a>
          <a className="cursor-pointer rounded-lg bg-black bg-opacity-10 p-2 px-4 text-sm hover:underline md:rounded-none md:bg-transparent md:p-0 md:text-blue-100">
            Testimonies
          </a>
        </div>
        <div className="flex flex-1 flex-col gap-2 md:gap-1">
          <h2 className="font-semibold">Contact Us</h2>
          <a
            className="flex cursor-pointer flex-row items-center gap-1 rounded-lg bg-black bg-opacity-10 p-2 px-4 text-sm hover:underline md:gap-0 md:rounded-none md:bg-transparent md:p-0 md:text-blue-100"
            href="mailto:jbpulliam06@gmail.com?cc=sawyerbivens06@gmail.com"
          >
            <Image
              src="/mail.svg"
              alt=""
              height={12}
              width={12}
              className="h-3 md:hidden"
            />
            <span>jbpulliam06@gmail.com</span>
          </a>
          <a
            className="flex cursor-pointer flex-row items-center gap-1 rounded-lg bg-black bg-opacity-10 p-2 px-4 text-sm hover:underline md:gap-0 md:rounded-none md:bg-transparent md:p-0 md:text-blue-100"
            href="mailto:sawyerbivens06@gmail.com?cc=jbpulliam06@gmail.com"
          >
            <Image
              src="/mail.svg"
              alt=""
              height={12}
              width={12}
              className="h-3 md:hidden"
            />
            <span>sawyerbivens06@gmail.com</span>
          </a>
        </div>
      </div>
      <div className="bg-blue-950 px-8 py-4 text-white sm:px-16 xl:px-32">
        &copy; {new Date().getFullYear()} all rights reserved.
      </div>
    </footer>
  );
}
