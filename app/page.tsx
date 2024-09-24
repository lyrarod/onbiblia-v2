import { getBooks } from "@/app/actions";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home({
  searchParams,
}: {
  searchParams?: { book?: string };
}) {
  const books = await getBooks();

  const searchBook = searchParams?.book || "";

  const filteredBook = searchBook
    ? books.filter((book) => book.slug.includes(searchBook))
    : books;

  return (
    <section className="container flex flex-col items-center justify-center w-full py-8">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredBook?.map((book, i) => (
          <Link href={`/${book?.slug}`} key={i}>
            <Card className="flex flex-col justify-between w-full transition select-none hover:scale-105">
              <CardHeader>
                <CardTitle className="pl-2 border-l-4 border-primary">
                  {book?.name}
                </CardTitle>
                <CardDescription>Autor: {book?.author}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Capítulos: {book?.chapters}</p>
                <p>Testamento: {book?.testament}</p>
                <p>Grupo: {book?.group}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-primary/60">{book?.name}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </ul>
    </section>
  );
}
