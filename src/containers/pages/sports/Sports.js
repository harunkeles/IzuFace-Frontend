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

  const dark = useSelector(state => state.theme.dark)
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [ isPageReady, setIsPageReady ] = useState(false);


  useEffect(() => {
      //!! GET Auth User  
      axios
      .get(`http://localhost:8000/api/v0/all-endpoints/auth-user-info/${localStorage.getItem("_user_id")}-${localStorage.getItem("_authToken")}`)
      .then(res => {
        dispatch(login(res.data));
        //!! GET Site Settings  
        axios.get(`http://localhost:8000/api/v0/all-endpoints/auth-user-site-settings/${localStorage.getItem("_user_id")}`)
        .then(theme_res => {
          dispatch(setDarkMode(theme_res.data.dark_theme))
          setIsPageReady(true)
        })
      })
      .catch(error => console.log(error))
      
  }, [isPageReady]);


  return <>
            { 
            !isPageReady ?
                <Loading/>
              :
                <>
                  <div id="sports_page">
                    <Navbar isPageReady={isPageReady}/> 
                    <div className="sports_page__cover">
                      <LeftSideMenu theme={dark}  user={user}  isPageReady={isPageReady}/>
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
