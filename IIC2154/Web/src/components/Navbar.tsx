import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  path: string;
  children: React.ReactNode;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ path, children, className = "" }) => (
  <div className={`self-stretch my-auto p-4 ${className}`}>
    <NavLink to={path} className={({ isActive, isPending }) =>
      isPending ? "font-thin" : isActive ? "font-bold" : ""
    }>{children}</NavLink>
  </div>
);

const navItems = [
  { path: "/", label: "Inicio" },
  { path: "/quienes-somos", label: "¿Quiénes somos?" },
  { path: "/soluciones", label: "Soluciones" },
  { path: "/miembros", label: "Miembros" },
  { path: "/noticias", label: "Noticias" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 flex flex-col justify-end items-center px-16 pb-3 z-50 text-base font-medium tracking-tight leading-6 text-center bg-indigo-50 bg-opacity-70 backdrop-blur text-stone-900 max-md:px-5">
      <div className="flex gap-5 pt-1 justify-between items-center w-full max-w-[1210px] max-md:flex-wrap max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b098b457339636538019b4ca9534054d3c1211eb83a3b9ab12af047309587ef?apiKey=56cba86632ee4f3a9ab1bf0ddb1b767f&"
          alt="Company logo"
          className="shrink-0 aspect-[1.02] w-[61px]"
        />
        <nav className="hidden md:flex gap-5 items-center my-auto">
          {navItems.map(({ path, label }) => (
            <NavItem path={path} key={label}>{label}</NavItem>
          ))}
          <NavItem path="/unete" className="justify-center self-stretch py-2.5 text-white whitespace-nowrap bg-lime-500 rounded-lg">
            Únete
          </NavItem>
        </nav>
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <nav className="sticky z-50 md:hidden flex flex-col gap-4 mt-4">
          {navItems.map(({ path, label }) => (
            <NavItem path={path} key={label}>{label}</NavItem>
          ))}
          <NavItem path="/unete" className="justify-center self-stretch py-2.5 text-white text-center whitespace-nowrap bg-lime-500 rounded-lg">
            Únete
          </NavItem>
        </nav>
      )}
    </header>
  );
};

export default Navbar;