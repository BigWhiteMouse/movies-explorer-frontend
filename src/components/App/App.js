import { Route, Routes, useLocation } from "react-router-dom";
import React from 'react';
import './App.css';
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";

function App() {

  const location = useLocation();

  const [isBurgerOpened, setBurgerOpened] = React.useState(false);
  const [isLike, setLike] = React.useState(false);

  function handleBurgerClick(){
    setBurgerOpened(true);
  }

  function handleCloseBurgerClick() {
    setBurgerOpened(false);
  }

  /*временная заглушка, чтобы посмотреть, как выглядит карточка с лайком*/
  function handleLikeClick() {
    if (isLike) setLike(false);
    else setLike(true);
  }

  return (
    <div className="App">
      {location.pathname === '/' &&
      <Header
        onBurgerLinkClick = {handleBurgerClick}
        isBurgerOpened = {isBurgerOpened}
        onCloseBurgerClick = {handleCloseBurgerClick}
      />}
      {(location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === '/profile')
      &&
      <Header
        onBurgerLinkClick = {handleBurgerClick}
        isBurgerOpened = {isBurgerOpened}
        onCloseBurgerClick = {handleCloseBurgerClick}
        isLightTheme
      />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies
          isLike = {isLike}
          onLikeClick = {handleLikeClick}
        />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {(location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies")
        && <Footer />}
    </div>
  );
}

export default App;
