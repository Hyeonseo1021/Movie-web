import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const Home = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleSearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  const moviePosters = ['1.webp', '2.webp', '3.webp', '4.webp', '5.jpg', '6.webp', '7.webp', '8.jpg', '9.webp', '10.webp'];
  const seriesPosters = ['1.webp', '2.webp', '3.jpg', '4.jpg', '5.webp', '6.jpg', '7.webp', '8.webp', '9.jpg', '10.jpg'];

  const movieSettings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 8,
    slidesToScroll: 2,
    cssEase: 'ease-in-out',
    
  };

  const seriesSettings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 8,
    slidesToScroll: 2,
    cssEase: 'ease-in-out'
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="home-logo">EVECOT</div>
        <div className="nav-item">시리즈</div>
        <div className="nav-item">영화</div>
        <div className="nav-item">신규 콘텐츠</div>
      </div>
      
      <img className="search" onClick={toggleSearchBar} src="search.png" alt="Search Icon" />

      <div className="profile-container">
        <img
          className='profile' onClick={toggleProfileMenu}
          src='profile.png'
          alt='Profile Icon'
        />
        {isProfileMenuOpen && (
          <div className="profile-menu">
            <div className="profile-menu-item">프로필 변경</div>
            <div className="profile-menu-item">프로필 관리</div>
          </div>
        )}
      </div>
      {isSearchBarOpen && (
        <div className="search-bar">
          <input type="text" placeholder="검색..." />
        </div>
      )}
  
      <div className="recommended-movies">
        <h2 className="carousel-title">추천 영화</h2>
        <Slider {...movieSettings}>
          {moviePosters.map((poster, index) => (
            <div key={index}>
              <img className="movie-image" src={`/posters/movie/${poster}`} alt={`Movie ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="recommended-series">
        <h2 className="carousel-title">추천 시리즈</h2>
        <Slider {...seriesSettings}>
          {seriesPosters.map((poster, index) => (
            <div key={index}>
              <img className="series-image" src={`/posters/serize/${poster}`} alt={`Series ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
