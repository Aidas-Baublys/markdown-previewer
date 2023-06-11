import { useEffect, useState } from "react";
import { marked } from "marked";
import initialContent from "./initialContent.txt";

import "./App.css";

export default function App() {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (!content) {
      fetch(initialContent)
        .then((res) => res.text())
        .then((data) => setContent(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  marked.use({
    gfm: true,
    breaks: true,
  });

  return (
    <main>
      <h1>Past markdown here:</h1>
      <textarea
        name="editor"
        id="editor"
        cols={100}
        rows={10}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <section
        id="preview"
        dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
      />
    </main>
  );
}
