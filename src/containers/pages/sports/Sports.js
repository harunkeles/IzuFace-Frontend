import React, { useEffect, useState } from 'react';
import LeftSideMenu from '../../../components/leftSide/LeftSideMenu';
import Navbar from '../../../components/navbar/Navbar';
import football from '../../../assets/img/bg_images/sports_page_images/football.png';
import basketball from '../../../assets/img/bg_images/sports_page_images/basketball.png';
import fitness from '../../../assets/img/bg_images/sports_page_images/fitness.png';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setDarkMode } from '../../../stores/themeSlice';
import Loading from '../../../components/loading/loading';
import { login } from '../../../stores/authSlice';
import { routes } from '../../../routes';



function Sports() {

  const [ isPageReady, setIsPageReady ] = useState(true);


  return <>
            { 
            !isPageReady ?
                <Loading/>
              :
                <>
                  <div id="sports_page">
                    <Navbar /> 
                    <div className="sports_page__cover">
                      <LeftSideMenu />
                      <div className="middle-side-contents">
                          <a href={routes.sports.football.path} className='card card_football'>
                            <div className='bg-blur'></div>
                            <img className='card-bg' src={football} alt=''/>
                            <div className='card-title-text'>
                                Futbol
                            </div>
                            <div className='card-content-text'>
                                Halı saha randevuları ve futbol ile alakalı herşey için tıkla
                            </div>
                          </a>
                          <a href='/sports' className='card card_basketball'>
                            <div className='bg-blur'></div>
                            <img className='card-bg' src={basketball} alt=''/>
                            <div className='card-title-text'>
                            Basketbol
                            </div>
                            <div className='card-content-text'>
                                Basketbol sahaları ve basketbol ile alakalı herşey için tıkla
                            </div>
                          </a>
                          <a href='/sports' className='card card_fitness'>
                            <div className='bg-blur'></div>
                            <img className='card-bg' src={fitness} alt=''/>
                            <div className='card-title-text'>
                            Fitness
                            </div>
                            <div className='card-content-text'>
                              Fitness salonu ve vücut geliştirme ile alakalı herşey için tıkla
                            </div>
                          </a>
                          <a href='/sports' className='card card_football'>
                            <div className='bg-blur'></div>
                            <img className='card-bg' src={football} alt=''/>
                            <div className='card-title-text'>
                                Futbol
                            </div>
                            <div className='card-content-text'>
                                Halı saha randevuları ve futbol ile alakalı herşey için tıkla
                            </div>
                          </a>
                          <a href='/sports' className='card card_basketball'>
                            <div className='bg-blur'></div>
                            <img className='card-bg' src={basketball} alt=''/>
                            <div className='card-title-text'>
                            Basketbol
                            </div>
                            <div className='card-content-text'>
                                Basketbol sahaları ve basketbol ile alakalı herşey için tıkla
                            </div>
                          </a>
                          <a href='/sports' className='card card_fitness'>
                            <div className='bg-blur'></div>
                            <img className='card-bg' src={fitness} alt=''/>
                            <div className='card-title-text'>
                            Fitness
                            </div>
                            <div className='card-content-text'>
                              Fitness salonu ve vücut geliştirme ile alakalı herşey için tıkla
                            </div>
                          </a>
                          <a href='/sports' className='card card_football'>
                            <div className='bg-blur'></div>
                            <img className='card-bg' src={football} alt=''/>
                            <div className='card-title-text'>
                                Futbol
                            </div>
                            <div className='card-content-text'>
                                Halı saha randevuları ve futbol ile alakalı herşey için tıkla
                            </div>
                          </a>
                          <a href='/sports' className='card card_basketball'>
                            <div className='bg-blur'></div>
                            <img className='card-bg' src={basketball} alt=''/>
                            <div className='card-title-text'>
                            Basketbol
                            </div>
                            <div className='card-content-text'>
                                Basketbol sahaları ve basketbol ile alakalı herşey için tıkla
                            </div>
                          </a>
                          <a href='/sports' className='card card_fitness'>
                            <div className='bg-blur'></div>
                            <img className='card-bg' src={fitness} alt=''/>
                            <div className='card-title-text'>
                            Fitness
                            </div>
                            <div className='card-content-text'>
                              Fitness salonu ve vücut geliştirme ile alakalı herşey için tıkla
                            </div>
                          </a>
                      </div>
                    </div>
                  </div>
                </>
            }
        </>;
}

export default Sports
