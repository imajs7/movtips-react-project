import React, { ChangeEvent, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import FilteredList from './components/commons/FilteredList/FilteredList';
import NotFound from './components/commons/NotFound/NotFound';
import NotificationsProvider from './components/commons/Notifications/NotificationsProvider';
import SingleMovie from './components/commons/SingleMovie/SingleMovie';
import Favorites from './components/Favorites/Favorites';
import FavoritesProvider from './components/Favorites/FavoritesProvider';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { GlobalStyles } from './styles/GlobalStyle';
import theme from './styles/Theme';

function App() {

  const [ query, setQuery ] = useState<string>('');

  const queryHandler = ( event : ChangeEvent<HTMLInputElement> ) => {
    setQuery( event.target.value );
  };

  return (
    <ThemeProvider theme={theme}>

      <GlobalStyles/>

      <NotificationsProvider>

        <FavoritesProvider>
        
          <div className="App">

            <Header query={query} queryHandler={queryHandler} />

            <Routes>

              <Route 
                index 
                element={<Home route="movies-in-theaters" query={query} />} 
              />

              <Route 
                path="/movies-in-theaters" 
                element={<FilteredList route="movies-in-theaters" query={query}/>} 
              />

              <Route 
                path="/movies-coming" 
                element={<FilteredList route="movies-coming" query={query}/>} 
              />

              <Route 
                path="/top-rated-india" 
                element={<FilteredList route="top-rated-india" query={query} />} 
              />

              <Route 
                path="/top-rated-movies" 
                element={<FilteredList route="top-rated-movies" query={query} />} 
              />

              <Route 
                path="/movie/:route/:movieId" 
                element={<SingleMovie />} 
              />

              <Route 
                path="/favorites" 
                element={<Favorites />} 
              />

              <Route 
                path="/*" 
                element={<NotFound/>} 
              />

            </Routes>

            <Footer/>

          </div>

        </FavoritesProvider>

      </NotificationsProvider>
      
    </ThemeProvider>
  );
}

export default App;
