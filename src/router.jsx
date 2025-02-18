import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProyectView from "@/views/proyects/CreateProyectView";
import InitialView from "@/views/InitialView";
import RegisterView from "@/views/RegisterView";
import CreateTeamView from "@/views/CreateTeamView";
import CreateProjectView from "@/views/CreateProjectView";
import CreateTaskView from "@/views/CreateTaskView";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<InitialView />} index />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/proyects/create" element={<CreateProyectView />} />
          <Route path="/createTeam" element={<CreateTeamView />} />
          <Route path="/createProject" element={<CreateProjectView />} />
          <Route path="/createTask" element={<CreateTaskView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
