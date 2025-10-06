import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface StrapiBlocksRendererProps {
  content: BlocksContent;
}

export default function StrapiBlocksRenderer({ content }: StrapiBlocksRendererProps) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
        heading: ({ children, level }) => {
          const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
          const sizeClasses = {
            1: 'text-3xl font-bold mb-4',
            2: 'text-2xl font-bold mb-3',
            3: 'text-xl font-semibold mb-3',
            4: 'text-lg font-semibold mb-2',
            5: 'text-base font-semibold mb-2',
            6: 'text-sm font-semibold mb-2',
          };
          return <HeadingTag className={sizeClasses[level as keyof typeof sizeClasses]}>{children}</HeadingTag>;
        },
        list: ({ children, format }) => {
          if (format === 'ordered') {
            return <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>;
          }
          return <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>;
        },
        link: ({ children, url }) => (
          <a
            href={url}
            className="text-primary hover:text-primary-dark underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        quote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-gray-700">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <pre className="bg-gray-100 rounded p-4 mb-4 overflow-x-auto">
            <code className="text-sm font-mono">{children}</code>
          </pre>
        ),
      }}
      modifiers={{
        bold: ({ children }) => <strong className="font-bold">{children}</strong>,
        italic: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <u className="underline">{children}</u>,
        strikethrough: ({ children }) => <s className="line-through">{children}</s>,
        code: ({ children }) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
      }}
    />
  );
}
