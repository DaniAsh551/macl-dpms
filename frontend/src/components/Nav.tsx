import { useLocation } from "@solidjs/router";
import { createSignal } from "solid-js";
import { AiOutlineClose, AiOutlineMenu } from "solid-icons/ai";
import {api} from "../api";

const NAV_ITEMS = [
  { text: "Home", url: "/" },
  { text: "About", url: "/about" }
];

const logout = () => {
  api.logout();
  window.location.reload();
};

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
            <a href={item.url}>{item.text}</a>
          </li>
        ))}
          {
            api.isLoggedIn() && <li>
              <img class="mr-1 w-8 h-8 rounded-full cursor-pointer" src={`https://ui-avatars.com/api/?name=${api.user.get()!.name}&background=random`} />
              <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a onClick={logout}>Logout</a></li>
              </ul>
            </li>
          }
          {
            !api.isLoggedIn() && <li
              class={`border-b-2 cursor-pointer mx-1.5 sm:mx-6 ${active("/login")}`}
            >
              <a href="/login">Login</a>
            </li>
          }
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
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-50'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 class='w-full text-3xl font-bold text-[#00df9a] m-4'>DPMS.</h1>

        {/* Mobile Navigation Items */}
        <li>
          {
            api.isLoggedIn() && <li>
              <img class="mr-1 w-8 h-8 rounded-full cursor-pointer" src={`https://ui-avatars.com/api/?name=${api.user.get()!.name}&background=random`} />
              <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a onClick={logout}>Logout</a></li>
              </ul>
            </li>
          }
          {
            !api.isLoggedIn() && <a
            href="/login"
            class={`block border-b-2 cursor-pointer mx-1.5 sm:mx-6 pt-4 ${active("/login")}`}
          >
            <span>Login</span>
          </a>
          }
        </li>
        {NAV_ITEMS.map(item => (
          <a
            href={item.url}
            class={`block border-b-2 cursor-pointer mx-1.5 sm:mx-6 pt-4 ${active(item.url)}`}
          >
            <span>{item.text}</span>
          </a>
        ))}
      </ul>
    </div>
  );
}
