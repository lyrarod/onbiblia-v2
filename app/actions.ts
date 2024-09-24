"use server";

import { generateSlug } from "@/lib/utils";

export type BookType = {
  abbrev: {
    pt: string;
    en: string;
  };
  author: string;
  chapters: number;
  comment?: string;
  group: string;
  name: string;
  testament: string;
  slug?: string;
};

export type VersesType = {
  verses: {
    number: number;
    text: string;
  }[];
};

const config = {
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
  next: {
    revalidate: 3600 * 24,
  },
};

export const getUser = async (email: String) => {
  const res = await fetch(
    `https://www.abibliadigital.com.br/api/users/${email}`,
    config
  );
  return await res.json();
};

export const getBooks = async () => {
  const res = await fetch(
    "https://www.abibliadigital.com.br/api/books",
    config
  );
  const books: BookType[] = await res.json();

  return books?.map((book) => ({
    ...book,
    slug: generateSlug(book?.name),
  }));
};

export const getBookBySlug = async (slug: string) => {
  const books = await getBooks();
  return books?.find((book) => book?.slug === slug);
};

export const getBook = async (book: string) => {
  const bookBySlug = await getBookBySlug(book);

  const abbrev = bookBySlug?.abbrev.pt!;

  const res = await fetch(
    `https://www.abibliadigital.com.br/api/books/${abbrev}`,
    config
  );

  const data: BookType = await res.json();

  return {
    ...data,
    slug: generateSlug(data?.name),
  };
};

export const getChapter = async (abbrev: string, chapter: number) => {
  const res = await fetch(
    `https://www.abibliadigital.com.br/api/verses/acf/${abbrev}/${chapter}`,
    config
  );

  const verses: VersesType = await res.json();

  return verses;
};
