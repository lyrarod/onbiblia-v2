"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "./ui/input";
import { generateSlug } from "@/lib/utils";
import { Suspense } from "react";

export function SearchBookComponent() {
  function Search() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleSearch(term: string) {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("book", term);
      } else {
        params.delete("book");
      }
      router.replace(`${pathname}?${params.toString().toLowerCase()}`);
    }

    return (
      pathname === "/" && (
        <Input
          type="search"
          placeholder="Buscar Livro..."
          onChange={(e) => handleSearch(generateSlug(e.target.value))}
          defaultValue={searchParams.get("book")?.toString()}
          className="p-2 max-w-36 sm:max-w-sm placeholder:italic placeholder:text-xs sm:placeholder:text-sm"
        />
      )
    );
  }

  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
