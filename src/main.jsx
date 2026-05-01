import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import Root from "./layouts/Root";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import AuthProvider from "./context/AuthProvider";
import MyProducts from "./components/MyProducts/MyProducts";
import ProtectedRoutes from "./protected/ProtectedRoutes";
import MyBids from "./components/MyBids/MyBids";
import ProductDetails from "./components/ProductDetails/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'productDetails/:id',
        loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`),
        element: <ProtectedRoutes> <ProductDetails></ProductDetails> </ProtectedRoutes>

      },
      {
        path: 'myProducts',
        element: <ProtectedRoutes>
          <MyProducts></MyProducts>
        </ProtectedRoutes>
      },
      {
        path: 'myBids',
        element: <ProtectedRoutes>
          <MyBids></MyBids>
        </ProtectedRoutes>
      },


    ]
  }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <RouterProvider router={router} />,
  </AuthProvider>
);