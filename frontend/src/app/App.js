import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { RouteLocations } from "./RouteLocations";
import PostBoardPage from "../Pages/postBoardPage/PostBoardPage";
import ProfilePage from "../Pages/profilePage/ProfilePage";
import CheckoutPage from "../Pages/checkoutPage/CheckoutPage";
import CartPage from "../Pages/cartPage/CartPage";
import LoginPage from "../Pages/loginPage/LoginPage";
import CreateAccountPage from "../Pages/createAccountPage/CreateAccountPage";
import ErrorPage from "../Pages/errorPage/ErrorPage";
import Navbar from "../Components/Navbar";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/">
        <Route
          path="/"
          index
          element={<Navigate to={RouteLocations.login} />}
        />
        <Route path="postBoard">
          <Route index element={<PostBoardPage />} />
        </Route>
        <Route path="profile">
          <Route index element={<ProfilePage />} />
        </Route>
        <Route path="checkout">
          <Route index element={<CheckoutPage />} />
        </Route>
        <Route path="cart">
          <Route index element={<CartPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="createAccount" element={<CreateAccountPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </>
  );
}

export default App;