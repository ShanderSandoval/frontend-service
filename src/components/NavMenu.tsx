import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export const NavMenu = () => {
  // Obtener el nombre de usuario del localStorage
  const username = localStorage.getItem("username");

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-purple-400">
        <Bars3Icon className="w-8 h-8 text-white" />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            {/* Mostrar el nombre de usuario */}
            <p className="text-center">Hola: {username}</p>
            <Link to="/createTeam" className="block p-2 hover:text-purple-950">
              Crear equipo
            </Link>
            <Link to="/createProject" className="block p-2 hover:text-purple-950">
              Crear proyecto
            </Link>
            <Link to="/createTask" className="block p-2 hover:text-purple-950">
              Crear tarea
            </Link>
            <button
              className="block p-2 hover:text-purple-950"
              type="button"
              onClick={() => {
                // Eliminar el nombre de usuario y el token del localStorage al cerrar sesión
                localStorage.removeItem("username");
                localStorage.removeItem("token");
                // Redirigir al usuario a la página de inicio de sesión
                window.location.href = "/login";
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};