import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import React from 'react';
import './App.css';
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import moviesApi from "../../utils/MoviesApi";
import {
  BREAKPOINT_DESKTOP, BREAKPOINT_MOBILE,
  BREAKPOINT_TABLET,
  DESKTOP_ADD_VALUE,
  DESKTOP_INITIAL_VALUE,
  LARGE_SCREEN_INITIAL_VALUE, MOBILE_ADD_VALUE, MOBILE_INITIAL_VALUE, MOVIES_BASE_URL, TABLET_ADD_VALUE, TABLET_INITIAL_VALUE
} from "../../utils/consts";
import mainApi from "../../utils/MainApi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";


function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const [isBurgerOpened, setBurgerOpened] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const isNothingFound = getFromLocalStorage('nothingFound');
  const [nothingFound, setNothingFound] = React.useState(isNothingFound || false);
  const [isSearchInProgress, setSearchInProgress] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [showMore, setShowMore] = React.useState(false);
  const [showedMovies, setShowedMovies] = React.useState(getFromLocalStorage('searchedMovies') || []);
  const [addValue, setAddValue] = React.useState(4);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(getFromLocalStorage('isLoggedIn') || false);
  const [registerValue, setRegisterValue] = React.useState({email: '', password: '', name: ''});
  const [loginValue, setLoginValue] = React.useState({email: '', password: ''});
  const [savedCards, setSavedCards] = React.useState([]);
  const [showedMoviesSavedMovies, setShowedMoviesSavedMovies] = React.useState(savedCards);
  const [nothingFoundSavedMovies, setNothingFoundSavedMovies] = React.useState(false);
  const [savedCardsSearchValue, setSavedCardsSearchValue] = React.useState('');
  const [savedCardsChecked, setSavedCardsChecked] = React.useState(false);
  const [previousResults, setPreviousResults] = React.useState([]);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorStatus, setErrorStatus] = React.useState('');

  React.useEffect(() => {
    const userId = getFromLocalStorage('userId');
    if (userId) {
      mainApi.checkUser()
        .then(res => {
          setCurrentUser({name: res.name, email: res.email});
          setIsLoggedIn(true);
        })
        .then(res => {
          mainApi.getCards()
            .then(cards => {
              setSavedCards(cards);
            })
        })
        .catch(err => {
          err.then(message => setErrorStatus(message));
          setIsSuccess(false);
          setInfoTooltipOpen(true);
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    setShowedMoviesSavedMovies(savedCards);
  }, [savedCards])

  React.useEffect(() => {
    setIsSaved();
  }, [savedCards, showedMovies])

  React.useEffect(() => {
    setCards(showedMovies);
  }, [showedMovies]);

  React.useEffect(() => {
    let cards = getFromLocalStorage('searchedMovies');
    if (cards) {
      resize();
      setCards(cards);
    }
  }, []);


  React.useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closePopup();
      }
    }
    if (isInfoTooltipOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isInfoTooltipOpen]);

  function resize() {
    if (windowWidth >= BREAKPOINT_DESKTOP) {
      calculateMoviesValue(LARGE_SCREEN_INITIAL_VALUE);
    }
    if (windowWidth < BREAKPOINT_DESKTOP && windowWidth > BREAKPOINT_TABLET) {
      calculateMoviesValue(DESKTOP_INITIAL_VALUE);
      setAddValue(DESKTOP_ADD_VALUE);
    }
    if (windowWidth <= BREAKPOINT_TABLET && windowWidth >= BREAKPOINT_MOBILE) {
      calculateMoviesValue(TABLET_INITIAL_VALUE);
      setAddValue(TABLET_ADD_VALUE);
    }
    if (windowWidth < BREAKPOINT_MOBILE) {
      calculateMoviesValue( MOBILE_INITIAL_VALUE);
      setAddValue(MOBILE_ADD_VALUE);
    }
  }

  function closePopup() {
    setInfoTooltipOpen(false);
  }

  function onResize () {
    setTimeout(() => {
      resize()}, 1000)
}

  React.useEffect(() => {
     onResize();
  }, [windowWidth]);

  React.useEffect(() => {
    const resize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  function getFromLocalStorage(item) {
    let result = localStorage.getItem(item);
    if (result) return JSON.parse(result);
  }

  function setToLocalStorage(item, array) {
    localStorage.setItem(item, JSON.stringify(array));
  }

  function removeFromLocalStorage(item) {
    localStorage.removeItem(item);
  }

  function handleBurgerClick(){
    setBurgerOpened(true);
  }

  function handleCloseBurgerClick() {
    setBurgerOpened(false);
  }

  async function handleLikeClick(card) {
    if (card.saved) {
     card.saved = false;
     const movieId = savedCards.find(i => i.movieId === card.id)._id;
     await mainApi.deleteCard(movieId)
       .then(res => {
         mainApi.getCards()
           .then(res => {
             setSavedCards(res);
             setSavedCardsSearchValue('');
             setPreviousResults([]);
             setInfoTooltipOpen(true);
             setIsSuccess(true);
           })
       })
       .catch(err => {
         console.log(err);
         card.saved = true;
         err.then(message => setErrorStatus(message));
         setIsSuccess(false);
         setInfoTooltipOpen(true);
       })
    }
    else {
      card.saved = true;
      const body = {
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: MOVIES_BASE_URL + card.image.url,
        trailerLink: card.trailerLink,
        thumbnail: MOVIES_BASE_URL + card.image.formats.thumbnail.url,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN
      }
      await mainApi.createCard(body)
        .then(res => {
          mainApi.getCards()
            .then(res => {
              setSavedCards(res);
              setSavedCardsSearchValue('');
              setPreviousResults([]);
              setIsSuccess(true);
              setInfoTooltipOpen(true);
            })
        })
        .catch(err => {
          card.saved = false;
          console.log(err);
          err.then(message => setErrorStatus(message));
          setIsSuccess(false);
          setInfoTooltipOpen(true);
        });
    }
  }

  async function handleDeleteCard(card) {
    if (showedMovies.length) {
      const deletedCard = showedMovies.find(i => i.id === card.movieId);
      deletedCard.saved = false;
    }
    await mainApi.deleteCard(card._id)
      .then(res => {
        mainApi.getCards()
          .then(res => {
            setSavedCards(res);
            setSavedCardsSearchValue('');
            setPreviousResults([]);
            setInfoTooltipOpen(true);
            setIsSuccess(true);
          })
      })
      .catch(err => {
        console.log(err);
        err.then(message => setErrorStatus(message));
        setIsSuccess(false);
        setInfoTooltipOpen(true);
      })
  }

  function setIsSaved() {
    if (showedMovies) {
      if (showedMovies?.length !== 0) {
        showedMovies.forEach(card => {
          if (savedCards.some(i => i.movieId === card.id)) card.saved = true;
        })
      }
    }
  }

  async function handleSearchSubmit(searchValue, isChecked) {
    setSearchInProgress(true);
    let localSavedMovies = getFromLocalStorage('movies');
    if (!localSavedMovies) {
      await getMovies();
      localSavedMovies = getFromLocalStorage('movies');
    }
    setSearchInProgress(false);
    renderMovies(localSavedMovies, searchValue, isChecked);
  }

  async function getMovies() {
    let movies = await moviesApi.getMovies();
    setToLocalStorage('movies', movies);
  }

  function renderMovies(movies, searchValue, isChecked) {
    let searchResults = movies.filter(movie =>
      movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(searchValue.toLowerCase()))
    if (isChecked) {
      setToLocalStorage('searchedMoviesFull', searchResults);
      searchResults = searchResults.filter(movie => movie.duration < 40);
    }
    else setToLocalStorage('searchedMoviesFull', searchResults);
    setToLocalStorage('searchedMovies', searchResults);
    setToLocalStorage('searchValue', searchValue);
    if (searchResults.length === 0) {
      setNothingFound(true);
      setToLocalStorage('nothingFound', true);
    }
    else {
      setNothingFound(false);
      setToLocalStorage('nothingFound', false);
    }
    const moviesToShow = getFromLocalStorage('searchedMovies');
    setShowedMovies(moviesToShow);
    resize();
  }

  function renderSavedMovies(searchValue, isChecked) {
    setPreviousResults([]);
    setSavedCardsSearchValue(searchValue);
    let searchResults = savedCards.filter(movie =>
      movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(searchValue.toLowerCase())
    )
    if (isChecked) searchResults = searchResults.filter(movie => movie.duration < 40);
    if (searchResults.length === 0) {
      setNothingFoundSavedMovies(true);
    }
    else {
      setNothingFoundSavedMovies(false);
    }
    setShowedMoviesSavedMovies(searchResults);
  }

  function calculateMoviesValue(count) {
    let searchedMovies = getFromLocalStorage('searchedMovies');
    if (searchedMovies?.length > count) {
      setShowMore(true);
      const moviesToShow = searchedMovies.splice(0, count);
      setShowedMovies(moviesToShow);
    }
    else {
      setShowedMovies(searchedMovies);
      setShowMore(false);
    }
  }

  function handleShowMore() {
    let searchedMovies = getFromLocalStorage('searchedMovies');
    if ((searchedMovies.length - addValue) >= showedMovies.length) {
      let moviesToShow = [];
      moviesToShow = searchedMovies.splice(0, (showedMovies.length + addValue));
      setShowedMovies(moviesToShow);
    }
    else setShowMore(false);
  }

  function handleDurationChange(isChecked) {
    let movies = getFromLocalStorage('searchedMovies');
    if (movies) {
      if (isChecked) {
        const searchResults = movies.filter(movie => movie.duration < 40);
        if (searchResults.length === 0) {
          setNothingFound(true);
          setToLocalStorage('nothingFound', true);
        }
        else {
          setNothingFound(false);
          setToLocalStorage('nothingFound', false);
        }
        setToLocalStorage('searchedMovies', searchResults);
        setShowedMovies(searchResults);
        resize();
      }
      else {
        movies = getFromLocalStorage('searchedMoviesFull');
        if (movies.length === 0) {
          setNothingFound(true);
          setToLocalStorage('nothingFound', true);
        }
        else {
          setNothingFound(false);
          setToLocalStorage('nothingFound', false);
        }
        setToLocalStorage('searchedMovies', movies);
        setShowedMovies(movies);
        resize();
      }
    }
  }

  function handleSavedDurationChange() {
    if (!savedCardsChecked && showedMoviesSavedMovies?.length !== 0) {
      setPreviousResults(showedMoviesSavedMovies);
      setSavedCardsChecked(true);
      const searchResults = showedMoviesSavedMovies.filter(movie => movie.duration < 40);
      if (searchResults.length === 0) {
        setNothingFoundSavedMovies(true);
      }
      else {
        setNothingFoundSavedMovies(false);
      }
      setShowedMoviesSavedMovies(searchResults);
    }
    else {
      setNothingFoundSavedMovies(false);
      setSavedCardsChecked(false);
      setShowedMoviesSavedMovies(previousResults);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const {email, password, name} = registerValue;
    if (!registerValue.email || !registerValue.password || !registerValue.name) return;
    await mainApi.register(email, password, name)
      .then(async res => {
        const email = registerValue.email;
        const password = registerValue.password;
        await login(email, password);
        setIsSuccess(true);
      })
      .catch(err => {
        setIsLoggedIn(false);
        console.log(err);
        err.then(message => setErrorStatus(message));
        setIsSuccess(false);
      })
      .finally(() => {
        setRegisterValue({email: '', password: '', name: ''});
        setInfoTooltipOpen(true);
      });
  }

  async function handleLogin(e) {
    e.preventDefault();
    const {email, password} = loginValue;
    await login(email, password);
    mainApi.getCards()
      .then(cards => {
        setSavedCards(cards);
      })
      .catch(err => {
        err.then(message => setErrorStatus(message));
        setIsSuccess(false);
        setInfoTooltipOpen(true);
        console.log(err);
      })
  }

  async function login(email, password) {
    if (!email || !password) return;
    await mainApi.login(email, password)
      .then(async res => {
        await mainApi.checkUser()
          .then(res =>{
            setIsLoggedIn(true);
            setCurrentUser({name: res.name, email: res.email});
            setToLocalStorage('userId', res._id);
            setToLocalStorage('isLoggedIn', true);
            setIsSuccess(true);
            setInfoTooltipOpen(true);
            navigate("/movies", {replace: true});
          })
          .catch(err => {
            err.then(message => setErrorStatus(message));
            setIsLoggedIn(false);
            setIsSuccess(false);
            setInfoTooltipOpen(true);
            console.log(err);
          });
      })
      .catch(err => {
        err.then(message => setErrorStatus(message));
        setIsLoggedIn(false);
        setIsSuccess(false);
        setInfoTooltipOpen(true);
        console.log(err)
      })
  }

  function handleSignOut() {
    mainApi.signout()
      .then(res => {
        removeFromLocalStorage('searchValue');
        removeFromLocalStorage('nothingFound');
        removeFromLocalStorage('userId');
        removeFromLocalStorage('movies');
        removeFromLocalStorage('searchedMoviesFull');
        removeFromLocalStorage('isChecked');
        removeFromLocalStorage('searchedMovies');
        removeFromLocalStorage('isLoggedIn');
        setIsLoggedIn(false);
        setShowedMovies([]);
        setSavedCards([]);
        setShowedMoviesSavedMovies([]);
        setCurrentUser({});
        setLoginValue({email: '', password: ''});
        setSavedCardsSearchValue('');
        setPreviousResults([]);
        setErrorStatus('');
      })
      .catch(err => {
        console.log(err);
        err.then(message => setErrorStatus(message));
        setIsSuccess(false);
        setInfoTooltipOpen(true);
      })
  }

  function handleUpdateProfile(name, email) {
    mainApi.updateProfile(name, email)
      .then(res => {
        setCurrentUser({name: res.name, email: res.email});
        setIsSuccess(true);
        setInfoTooltipOpen(true);
      })
      .catch(err => {
        console.log(err);
        err.then(message => setErrorStatus(message));
        setIsSuccess(false);
        setInfoTooltipOpen(true);
      })
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      {location.pathname === '/' &&
      <Header
        onBurgerLinkClick = {handleBurgerClick}
        isBurgerOpened = {isBurgerOpened}
        onCloseBurgerClick = {handleCloseBurgerClick}
        isLoggedIn = {isLoggedIn}
      />}
      {(location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === '/profile')
      &&
      <Header
        onBurgerLinkClick = {handleBurgerClick}
        isBurgerOpened = {isBurgerOpened}
        onCloseBurgerClick = {handleCloseBurgerClick}
        isLoggedIn = {isLoggedIn}
        isLightTheme
      />}
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element = {Movies}
                onLikeClick = {handleLikeClick}
                onSearch = {handleSearchSubmit}
                cards = {cards}
                onCheck = {handleDurationChange}
                nothingFound = {nothingFound}
                isSearchInProgress = {isSearchInProgress}
                showMore = {showMore}
                onShowMore = {handleShowMore}
                isLoggedIn = {isLoggedIn}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn = {isLoggedIn}
                cards = {showedMoviesSavedMovies}
                onDelete = {handleDeleteCard}
                onSearch = {renderSavedMovies}
                onCheck = {handleSavedDurationChange}
                nothingFound = {nothingFoundSavedMovies}
                searchValue = {savedCardsSearchValue}
                getCheckedValue = {savedCardsChecked}
                setCheckedValue = {setSavedCardsChecked}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn = {isLoggedIn}
                onSignOut = {handleSignOut}
                onClick = {handleUpdateProfile}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onSubmit = {handleRegister}
                registerValue = {registerValue}
                setRegisterValue = {setRegisterValue}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onSubmit = {handleLogin}
                loginValue = {loginValue}
                setLoginValue = {setLoginValue}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {(location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies")
        && <Footer />}
        <InfoTooltip
          isOpen = {isInfoTooltipOpen}
          onClose = {closePopup}
          isSuccess = {isSuccess}
          errorStatus = {errorStatus}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
