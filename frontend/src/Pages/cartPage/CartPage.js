import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "../../app/firebase.js";
import axios from "axios";
import { onAuthStateChanged } from "@firebase/auth";
import { Container, Grid } from "@mui/material";
import PostCard from "../postBoardPage/PostCard";
import PostCardCart from "../postBoardPage/PostCardCart.js";
import Navbar from "../../Components/Navbar.js";

export default function CartPage() {
  const [myCart, setMyCart] = useState([]);
  const [curUser, setCurUser] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setCurUser(user.email);
        } catch (error) {
          // Handle any errors
          console.error(error);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/cart/${curUser}`
        );
        setMyCart(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (curUser) fetchData();
  }, [curUser]);

  const removeFromCart = async (id) => {
    try {
      const response = await axios.post(`http://localhost:9000/cart/remove`, {
        email: curUser,
        id: id,
      });
      const res = await axios.get(`http://localhost:9000/cart/${curUser}`);
      setMyCart(res.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="item-container">
        <h1>Saved Items</h1>

        <Container maxWidth="fullWidth">
          <Grid container className="cardGrid" spacing={3}>
            {myCart.map((data, index) => (
              <PostCardCart
                key={data.id}
                data={data}
                removeFromCart={removeFromCart}
              />
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
}

// {myCart.map((item, index) => (
//   <div key={index}>
//     {/* <img src={item.imageUrl} alt="item" /> */}
//     <h2>{item.name}</h2>
//     <h3>Price: ${item.price}</h3>
//     <h3>
//       Saved by {item.amountSaved}{" "}
//       {item.amountSaved === 1 ? "user" : "users"}
//     </h3>
//   </div>
// ))}
