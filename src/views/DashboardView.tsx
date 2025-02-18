import { Link } from "react-router-dom";

function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-black">Mis proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-4">
        Maneja y administra tus proyectos
      </p>

      <nav className="my-5">
        <Link className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
        to={"/proyects/create"}
        >
        Nuevo proyecto
        </Link>
      </nav>
    </>
  );
}

export default DashboardView;
