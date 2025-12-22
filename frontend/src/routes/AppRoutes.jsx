import {
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthorsData } from "../components/AuthorsData";
import { AppLayout } from "../layout/AppLayout";
import AuthorDetails from "../components/AuthorDetails";
// import { EditAuthor } from "../components/EditAuthor";
import { EditAuthorTwo } from "../components/EditAuthorTwo";

// OLD METHOD OF ROUTING
// export const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<AuthorsData />} />
//     </Routes>
//   );
// };

// NEW METHOD OF ROUTING
export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <AuthorsData />,
        },
        {
          path: "authors/:id",
          element: <AuthorDetails />,
        },
        {
          path: "authors/:id/edit",
          element: <EditAuthorTwo />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
