import { sanitizeHtml } from '@/lib/data/string/sanitizeHtml';
import parse from 'html-react-parser';

interface HtmlGeneratorProps {
  html?: string;
  className?: string;
  allowTags?: string[];
  allowAttr?: string[];
  allowScript?: boolean;
  useDefaultTags?: boolean;
  useDefaultAttrs?: boolean;

  /**
   * @default false
   *
   * If true, the html will not be sanitized
   */
  avoidSanitization?: boolean;
}

const HtmlGenerator = ({
  html = '',
  allowTags,
  allowAttr,
  allowScript,
  useDefaultTags,
  useDefaultAttrs,
  avoidSanitization,
}: HtmlGeneratorProps) => {
  const sanitizedHtml = avoidSanitization ? html :
    sanitizeHtml({
      html,
      allowTags,
      allowAttr,
      allowScript,
      useDefaultTags,
      useDefaultAttrs,
    });

  const htmlParser = parse(sanitizedHtml);
  return <>{htmlParser}</>;
};

export default HtmlGenerator;
