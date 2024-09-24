import { getBook, getChapter } from "@/app/actions";
import { TextToSpeech } from "@/components/text-to-speech";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { book: string; chapter: string };
}) {
  const book = await getBook(params?.book);
  return {
    title: book?.name + " " + params?.chapter,
  };
}

export default async function Chapter({
  params,
}: {
  params: { book: string; chapter: string };
}) {
  const book = await getBook(params?.book);
  const abbrev = book?.abbrev.pt!;

  const { verses } = await getChapter(abbrev, Number(params?.chapter));

  const text = verses.map(({ text }) => text);

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto space-y-2 sm:p-8">
      <div className="flex items-center self-start px-4 pt-8 sm:p-0 gap-x-6">
        <h1 className="flex self-start pl-3 text-2xl border-l-8 select-none sm:text-3xl border-primary">
          <Link href={`/${book?.slug}`}>{book?.name}</Link>&nbsp;
          {params?.chapter}
        </h1>
      </div>

      <TextToSpeech text={text} />

      <Button size={"sm"} variant={"link"} className="self-start" asChild>
        <Link href={`/${book?.slug}`}>← voltar</Link>
      </Button>
    </div>
  );
}
