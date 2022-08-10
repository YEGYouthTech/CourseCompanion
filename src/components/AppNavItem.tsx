import Link from 'next/link';
import { useRouter } from 'next/router';

type INavItemProps = {
  href: string;
  children: React.ReactNode;
};

function AppNavItem({ href, children }: INavItemProps) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`${
          router.pathname === href
            ? 'font-medium text-black hover:bg-gray-700 hover:text-white'
            : 'text-gray-800 hover:bg-gray-700 hover:text-white'
        } rounded-md px-3 py-2 text-sm`}
      >
        {children}
      </a>
    </Link>
  );
}

export default AppNavItem;
