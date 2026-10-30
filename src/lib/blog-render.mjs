// Article bodies are first-party content from the authenticated webhook.
// marked leaves block HTML in place. This module does not sanitize.
import { marked } from "marked";
import { omitDuplicateTitleHeading } from "./blog.mjs";

export function renderArticleHtml(body, title) {
  const html = marked.parse(body ?? "", { async: false });
  return omitDuplicateTitleHeading(html, title);
}
