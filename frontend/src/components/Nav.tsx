import { useLocation } from "@solidjs/router";
import { createSignal } from "solid-js";
import { AiOutlineClose, AiOutlineMenu } from "solid-icons/ai";

const NAV_ITEMS = [
  { text: "Home", url: "/" },
  { text: "About", url: "/about" }
];

export default function Nav() {
  const [nav, setNav] = createSignal(false);
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

  return (
    <div class='bg-black flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      {/* Logo */}
      <h1 class='w-full text-3xl font-bold text-[#00df9a]'>DPMS.</h1>

      {/* Desktop Navigation */}
      <ul class='hidden md:flex'>
        {NAV_ITEMS.map(item => (
          <li
            class={`border-b-2 cursor-pointer mx-1.5 sm:mx-6 ${active(item.url)}`}
          >
            {item.text}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div class='block md:hidden'>
        <a onclick={() => setNav(!nav())}>
          {nav() ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </a>
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        class={
          nav()
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 class='w-full text-3xl font-bold text-[#00df9a] m-4'>DPMS.</h1>

        {/* Mobile Navigation Items */}
        {NAV_ITEMS.map(item => (
          <li
            class={`border-b-2 cursor-pointer mx-1.5 sm:mx-6 pt-4 ${active(item.url)}`}
          >
            <a href={item.url}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
