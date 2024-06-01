import Link from "next/link";
import { Person } from "akar-icons";

export default function MenuBar() {
  return (
    <nav className="flex justify-between items-center w-full bg-bg-primary border-[1px] border-bg-borders p-4 my-4 rounded-xl">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-txt-primary font-bold text-2xl">
          Blogu
        </Link>
        <Link
          href="/about"
          className="text-txt-primary text-sm1 p-2 hover:bg-bg-secondary rounded-lg w-fit">
          About
        </Link>
      </div>
      <div className="flex items-center gap-4 ">
        <Link
          href="#"
          className="text-txt-primary flex items-center gap-1 p-2 hover:bg-bg-secondary rounded-lg text-sm w-fit">
          <Person size={16} />
          <span>Sign in</span>
        </Link>
      </div>
    </nav>
  );
}
