import Link from "next/link";
import { getBook } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export async function generateMetadata({
  params,
}: {
  params: { book: string };
}) {
  const book = await getBook(params?.book);
  return {
    title: book?.name,
  };
}

export default async function Book({ params }: { params: { book: string } }) {
  const book = await getBook(params?.book);
  const chapters = Array.from({ length: book?.chapters! }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex flex-col flex-wrap w-full max-w-xl px-4 py-8 space-y-2 text-sm sm:px-0">
        <h1 className="pl-3 text-2xl border-l-8 sm:text-3xl border-primary">
          {book?.name}
        </h1>

        <span className="text-muted-foreground">
          <p>Autor: {book?.author}</p>
          <p>Capítulos: {book?.chapters}</p>
          <p>Testamento: {book?.testament}</p>
          <p>Grupo: {book?.group}</p>
        </span>

        {book?.comment !== "" && (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Saiba mais</AccordionTrigger>
              <AccordionContent>
                <pre className="whitespace-pre-wrap">{book?.comment}</pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        <span className="flex flex-wrap w-full max-w-xl gap-2 py-2 sm:gap-3">
          {chapters.map((chapter, i) => (
            <Button key={i} size={"icon"} variant={"secondary"} asChild>
              <Link href={`/${book?.slug}/${chapter}`}>{chapter}</Link>
            </Button>
          ))}
        </span>

        <Button size={"sm"} variant={"link"} asChild className="self-start p-0">
          <Link href={`/`}>← voltar</Link>
        </Button>
      </div>
    </div>
  );
}
