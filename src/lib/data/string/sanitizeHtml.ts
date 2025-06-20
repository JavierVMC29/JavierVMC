/* The library makes it possible to use DOMPurify on server and client side in the same way. */
import DOMPurify from 'isomorphic-dompurify';

interface sanitizeHtmlProps {
  html: string | undefined;
  allowTags?: string[];
  allowAttr?: string[];
  allowScript?: boolean;
  useDefaultTags?: boolean;
  useDefaultAttrs?: boolean;
}

export function sanitizeHtml({
  html,
  allowTags = [],
  allowAttr = [],
  allowScript = false,
  useDefaultTags = true,
  useDefaultAttrs = true,
}: sanitizeHtmlProps) {
  if (!html) return '';
  const defaultTags = [
    'a',
    'b',
    'i',
    'u',
    'em',
    'strong',
    'div',
    'span',
    'p',
    'ul',
    'ol',
    'li',
    'br',
    'blockquote',
    'img',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ];

  const defaultAttrs = [
    'href',
    'src',
    'alt',
    'class',
    'style',
    'width',
    'height',
    'align',
  ];

  const usingTags = useDefaultTags
    ? [...defaultTags, ...allowTags]
    : [...allowTags];
  const usingAttrs = useDefaultAttrs
    ? [...defaultAttrs, ...allowAttr]
    : [...allowAttr];

  const sanitizedHtml = DOMPurify.sanitize(html, {
    FORCE_BODY: allowScript,
    ALLOWED_TAGS: usingTags,
    ALLOWED_ATTR: usingAttrs,
  });

  return sanitizedHtml;
}
