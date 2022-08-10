import Link from 'next/link';
import { useRouter } from 'next/router';

type INavItemProps = {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  right?: boolean;
};

function NavItem({ href, children, mobile, right }: INavItemProps) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`${
          router.pathname.startsWith(href)
            ? 'text-white hover:bg-gray-700'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        } ${
          !mobile
            ? 'rounded-md px-3 py-2 text-sm font-medium'
            : 'block rounded-md px-3 py-2 text-base font-medium'
        } ${right ? 'text-right' : 'text-left'}`}
      >
        {children}
      </a>
    </Link>
  );
}

export default NavItem;
