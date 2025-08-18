import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';

interface AsideLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  url?: Url;
  children: React.ReactNode;
  className?: string;
  categorySlug?: string;
  pageSlug: string
}

const AsideLink: React.FC<AsideLinkProps> = ({ pageSlug, url, children, className = '', categorySlug, ...props }) => {
  
  const isActive =
    categorySlug && pageSlug
    ? categorySlug === pageSlug
    : !categorySlug && (!pageSlug || !pageSlug);

  if (!url) {
    return (
      <a
        className={`${className} font-headings hover:bg-transparent rounded-md transition-all font-medium text-lg flex items-center gap-4 px-4 py-3 text-gray-500 opacity-50 cursor-default`}
        {...props}
      >
        <div className="flex items-center gap-3">{children}</div>
      </a>
    );
  }

  return (
    <Link href={url} {...props}>
      <div
        className={`${className} font-headings hover:bg-secondary/5 rounded-md transition-all font-medium text-lg flex items-center gap-4 px-4 py-3 ${
          isActive ? 'text-primary' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          {isActive && <div className="h-6 w-0.5 bg-primary rounded-full" />}
          <div>
            {children}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AsideLink;
