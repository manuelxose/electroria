export function sanitizeLegacyArticleHtml(value: string): string {
  return value
    .replace(/<div id="ez-toc-container"[\s\S]*?<\/nav><\/div><\/div>/gi, "")
    .replace(/<div id="ez-toc-container"[\s\S]*?<\/nav><\/div>/gi, "")
    .replace(/<h2 class="wp-block-heading"><\/h2>/gi, "")
    .replace(/<p[^>]*>\s*<\/p>/gi, "")
    .replace(/<div class="et_pb_column et_pb_column_1_4[\s\S]*$/gi, "")
    .replace(/(<\/div>\s*){3,}$/gi, "")
    .replace(/\s+(target="_blank")/gi, ' $1')
    .trim();
}

export function formatSpanishDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Publicado recientemente";
  }

  return parsed.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
