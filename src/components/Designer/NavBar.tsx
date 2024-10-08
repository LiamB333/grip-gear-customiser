// components/Navbar.js
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative z-50 bg-[#F5F7FA]">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-center md:hidden">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-removed-bg.svg"
            alt="Grip Gear logo"
            width={180}
            height={60}
            priority
          />
        </Link>
      </div>
      {/* BIGGER SCREENS */}
      <nav className="hidden md:flex items-center justify-between gap-8 h-full z-50 bg-[#F5F7FA]">
        {/* LEFT */}
        <div className="flex items-center gap-12"></div>
        {/* CENTER */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-removed-bg.svg"
              alt="Grip Gear logo"
              width={180}
              height={60}
              priority
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
