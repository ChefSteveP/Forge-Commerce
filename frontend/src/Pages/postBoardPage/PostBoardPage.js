import React, { useEffect, useState } from "react";
import "./PostBoardPage.css";
import Header from "./Header";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import PostCard from "./PostCard";
import { auth } from "../../app/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../../Components/Navbar";

export default function PostBoardPage() {
  const [info, setInfo] = useState();
  const [search, setSearch] = useState("");
  const [filteredInfo, setFilteredInfo] = useState();
  const [curUser, setCurUser] = useState("");
  const [filters, setFilters] = useState({});

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
          `https://forge-commerce.onrender.com/postBoard/${curUser}`
        );
        setInfo(response.data.filter((info) => !info.isSold));
      } catch (error) {
        console.log(error);
      }
    };
    if (curUser) fetchData();
  }, [curUser]);

  const addToCart = async (id) => {
    try {
      await axios.post(`https://forge-commerce.onrender.com/cart/add`, {
        email: curUser,
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function applyFilters(info) {
    const { condition, state } = filters;
    const nameMatch = search
      ? info.name.toLowerCase().includes(search.toLowerCase())
      : true;
    const conditionMatch = condition ? info.condition === condition : true;
    const stateMatch = state ? info.state === state : true;
    return nameMatch && conditionMatch && stateMatch;
  }

  useEffect(() => {
    if (info) {
      setFilteredInfo(info.filter(applyFilters));
    }
  }, [info, filters, applyFilters]);

  const filteredData = search
    ? filteredInfo.filter(applyFilters)
    : info?.filter(applyFilters);

  if (filters.priceSort === "price-ascending") {
    filteredData.sort((a, b) => a.price - b.price);
  } else if (filters.priceSort === "price-descending") {
    filteredData.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <Navbar />
      <div className="item-container">
        <header className="page-title">
          <Header
            search={search}
            handleSearch={handleSearch}
            setFilters={setFilters}
          />
        </header>
        <main>
          <Container maxWidth="fullWidth">
            <Grid container className="cardGrid" spacing={3}>
              {filteredData?.map((data, index) => (
                <PostCard data={data} index={index} addToCart={addToCart} />
              ))}
            </Grid>
          </Container>
        </main>
      </div>
    </>
  );
}
