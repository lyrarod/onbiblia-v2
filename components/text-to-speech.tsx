"use client";

import config from "@/tailwind.config";
import { useMemo } from "react";
import Speech, { HighlightedText } from "react-text-to-speech";

export function TextToSpeech({ text = ["Olá mundo!"] }: { text?: string[] }) {
  const textMemo = useMemo(
    () => (
      <ol className="flex flex-col justify-center pl-8 pr-2 list-decimal sm:pl-4">
        {text.map((t, i) => (
          <li
            key={i}
            className="p-2 text-sm rounded even:bg-secondary dark:even:bg-secondary/50 sm:text-base"
          >
            <pre className="whitespace-pre-wrap">{`${t}`}</pre>
          </li>
        ))}
      </ol>
    ),
    [text]
  );

  return (
    <div className="flex flex-col gap-2 select-none">
      <div className="flex items-center gap-4 pt-2 pl-4 text-sm sm:pt-2 sm:pl-0 text-muted-foreground">
        Ouvir:
        <Speech
          id="speech"
          text={textMemo}
          highlightText={true}
          lang="pt-BR"
          voiceURI="Microsoft Daniel - Portuguese (Brazil)"
          highlightProps={{
            style: {
              color: config.theme.extend.colors.primary.foreground,
              backgroundColor: config.theme.extend.colors.primary.DEFAULT,
            },
          }}
        />
      </div>

      <HighlightedText id="speech" className="flex self-start mx-0">
        {textMemo}
      </HighlightedText>
    </div>
  );
}
