export interface DedentOptions {
  tabWidth?: number;
  useTabs?: boolean;
  trim?: boolean;
}

type SubjectLineEmpty = { width: null; str: "" };
type SubjectLineNonEmpty = { width: number; str: string };
type SubjectLine = SubjectLineEmpty | SubjectLineNonEmpty;

export function dedent(options: DedentOptions): (str: string) => string {
  // options
  const tabWidth = options?.tabWidth ?? 2;
  const useTabs = options?.useTabs ?? false;
  const trim = options?.trim ?? false;

  function countWidth(spaces: string) {
    return spaces.replace(/\t/g, " ".repeat(tabWidth)).length;
  }

  function splitWhitespace(line: string): SubjectLine {
    // return null for empty lines
    if (/^\s*$/.test(line)) {
      return { width: null, str: "" };
    }

    const match = line.match(/^(\s*)(.*)$/) as RegExpMatchArray; // (.*) always matches
    const width = countWidth(match[1]);
    const str = match[2];
    return { width, str };
  }

  function makeSpaces(width: number) {
    if (useTabs) {
      const tabs = Math.floor(width / tabWidth);
      const extra = width % tabWidth;
      let out = "\t".repeat(tabs);

      if (extra) {
        out += " ".repeat(extra);
      }

      return out;
    }

    return " ".repeat(width);
  }

  function formResult(subject: SubjectLine[], minWidth: number) {
    let result = subject
      .map(line =>
        line.width === null ? "" : makeSpaces(line.width - minWidth) + line.str
      )
      .join("\n");

    if (trim) {
      result = result.replace(/^\n+|\n+$/g, "");
    }

    return result;
  }

  return (str: string) => {
    const subject = str
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map(line => splitWhitespace(line));

    // find minimum width
    function filterEmptyLines(line: SubjectLine): line is SubjectLineNonEmpty {
      return line.width !== null;
    }
    const nonEmptyLines = subject.filter(filterEmptyLines);
    const minWidth = Math.min(...nonEmptyLines.map(line => line.width));

    return formResult(subject, minWidth);
  };
}
