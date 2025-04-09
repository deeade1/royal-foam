import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./views/home";
import Faq from "./views/faq";
import About from "./views/about";
//import Feature from "./views/features";
import Shop from "./views/products/shop";
import ProductDetail from "./views/products/product-detail";
import Blog from "./views/blog/blog";
import ContactUs from "./views/contact-us";
import BlogDetail from "./views/blog/blog-detail";
import Error404 from "./views/error404";

// Auth Pages
import ConfirmMail from "./views/auth/confirm-mail";
import LockScreen from "./views/auth/lock-screen";
import Recoverpw from "./views/auth/recoverpw";
import SignIn from "./views/auth/sign-in";
import SignUp from "./views/auth/sign-up";

// Product Categories
import LuxuryMattresses from "./views/products/luxury-mattresses";
import OrthopaedicMattresses from "./views/products/orthopaedic-mattresses";
import valueMattresses from "./views/products/value-mattresses";
import springMattresses from "./views/products/spring-mattresses";
// ✅ Fixed Import for Videos Page
import Video from "./views/videos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "faq", element: <Faq /> },
      { path: "about", element: <About /> },
      { path: "videos", element: <Video /> }, // ✅ Fixed typo ("vidoes" → "videos")
      //{ path: "features", element: <Feature /> },
      { path: "blog/blog", element: <Blog /> },
      { path: "blog/blog-detail/:slug", element: <BlogDetail /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "products/shop", element: <Shop /> },
      { path: "products/luxury-mattresses", element: <LuxuryMattresses /> },
      { path: "products/orthopaedic-mattresses", element: <OrthopaedicMattresses /> },
      { path: "products/product-detail/:slug", element: <ProductDetail /> },

      { path: "*", element: <Error404 /> }, // ✅ Catch-all for 404 errors
    ],
  },
  { path: "auth/sign-in", element: <SignIn /> },
  { path: "auth/sign-up", element: <SignUp /> },
  { path: "auth/confirm-mail", element: <ConfirmMail /> },
  { path: "auth/lock-screen", element: <LockScreen /> },
  { path: "auth/recoverpw", element: <Recoverpw /> },
]);

export default router;
