import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { BookOpenText } from "lucide-react";
import { SearchBookComponent } from "./search-book";

export function Header() {
  return (
    <header className="sticky top-0 left-0 z-50 flex items-center justify-between w-full shadow dark:border-b bg-background/60 backdrop-blur">
      <nav className="container flex items-center justify-between w-full px-4 py-6 sm:p-8">
        <Link href={`/`}>
          <strong className="flex items-center text-2xl tracking-wide sm:tracking-wider">
            <BookOpenText />
            <span className="pl-2 text-primary">On</span>Bíblia
          </strong>
        </Link>

        <SearchBookComponent />

        <ModeToggle />
      </nav>
    </header>
  );
}
