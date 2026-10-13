import { Fragment } from 'react';

interface WordsProps {
  text: string;
  /** Index of the first word, so a headline split into parts keeps one continuous rhythm. */
  start?: number;
}

/** Splits a headline into words that rise into place one after another (see motion.css). */
export function Words({ text, start = 0 }: WordsProps) {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((word, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className="w">
        <span style={{ transitionDelay: `${(start + i) * 55}ms` }}>{word}</span>
      </span>
    </Fragment>
  ));
}

export const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;
