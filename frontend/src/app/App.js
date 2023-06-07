import Navbar from "../Components/Navbar";
import React from "react";



function App() {
  return (
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
  );
}

export default App;
