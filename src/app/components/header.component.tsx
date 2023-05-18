// import Image from "next/image";
import Link, { LinkProps } from "next/link";

const Header = () => {
  return (
    <header className="w-full p-3 mx-auto lg:flex lg:justify-between max-w-7xl lg:px-3">
      <Link href="/" className="flex items-center justify-between">
        {
          /*<Image
          src="/links-store.svg"
          height={48}
          width={48}
          alt="links store logo"
        />*/
        }
        <span className="text-xl font-semibold whitespace-nowrap dark:text-white">
          MyFavVault
        </span>
      </Link>
      <div className="relative hidden lg:flex items-center">
        <nav className="leading-6 font-semibold text-slate-700 dark:text-slate-200">
          <ul className="flex space-x-8">
            <NavItem label="Home" href="/" />
            <NavItem label="Search" href="/search" prefetch={false} />
            <NavItem label="About us" href="/about" prefetch={false} />
          </ul>
        </nav>
      </div>
      <button
        type="button"
        className="text-white bg-sky-500 hover:bg-sky-700 font-medium rounded-lg 
        text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700"
      >
        Default
      </button>
    </header>
  );
};

type NavItemProps = LinkProps & {
  label: string;
};

const NavItem = ({ label, ...rest }: NavItemProps) => {
  return (
    <li>
      <Link
        {...rest}
        className="hover:text-sky-500 dark:hover:text-sky-400"
      >
        {label}
      </Link>
    </li>
  );
};

export default Header;
