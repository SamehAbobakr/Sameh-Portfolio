import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Skills from '../../pages/Skills';
import Projects from '../../pages/Projects';
import ProjectDetails from '../../pages/Projects/ProjectDetails';
import Learning from '../../pages/Learning';
import Certificates from '../../pages/Certificates';
import Contact from '../../pages/Contact';

// Add each new page as another child here (then enable it in config/routes.js).
const router = createBrowserRouter([
  { path: '/', element: <MainLayout />, children: [
    { index: true, element: <Home /> },
    { path: 'about', element: <About /> }, { path: 'skills', element: <Skills /> },
    { path: 'projects', element: <Projects /> }, { path: 'projects/:slug', element: <ProjectDetails /> },
    { path: 'learning', element: <Learning /> }, { path: 'certificates', element: <Certificates /> },
    { path: 'contact', element: <Contact /> },
  ] },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
