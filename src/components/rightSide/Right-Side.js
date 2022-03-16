import React, { useEffect, useState } from 'react'

import IITC from '../../assets/img/others/IITC.jpg'
import post6 from '../../assets/img/others/post6.jpg'
import post7 from '../../assets/img/others/post7.jpg'
import post5 from '../../assets/img/others/post5.jpg'
import post4 from '../../assets/img/others/post4.jpg'
import sun from '../../assets/img/icons/weather/sun.png'
import partly_cloudy from '../../assets/img/icons/weather/partly_cloudy.png'
import light_rain from '../../assets/img/icons/weather/light_rain.png'
import cloud_1 from '../../assets/img/icons/weather/cloud_1.png'
import cloud_2 from '../../assets/img/icons/weather/cloud_2.png'
import heavy_rain from '../../assets/img/icons/weather/heavy_rain.png'
import windy_cloud from '../../assets/img/icons/weather/windy_cloud.png'
import storm_rain_cloud from '../../assets/img/icons/weather/storm_rain_cloud.png'
import social_address from '../../assets/img/icons/main_icons/social_address.png'


import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setWeatherState } from '../../stores/weatherSlice'
import { routes } from '../../routes'



function RightSide() {

    const [isweatherReady, setWeatherReady] = useState(false);
    const weather = useSelector(state => state.weather.weather)
    const dark = useSelector(state => state.theme.dark)
    const dispatch = useDispatch()

    function weatherState(){
        let weather_suggest_list = {}
        switch (isweatherReady) {
            case weather.weather[0].description === "açık":
                weather_suggest_list = {
                    'suggest': 'Bugün hava durumu güzel. Korkacak bir durum yok:D',
                    'icon': sun,
                }
                break;
            case weather.weather[0].description === "kapalı":
                weather_suggest_list = {
                    'suggest': 'Bugün hava durumu güzel ama kapalı. Dikkat et :=|',
                    'icon':  cloud_1
                }
                break;
            case weather.weather[0].description === "hafif yağmur":
                weather_suggest_list = {
                    'suggest': 'Bugün hava yağmurlu. Yanına şemsiye almanı öneririm.',
                    'icon':  light_rain
                }
                break;
            case weather.weather[0].description === "kısa süreli hafif yoğunluklu yağmur":
                weather_suggest_list = {
                    'suggest': 'Bugün hava yağmurlu. Yanına şemsiye almanı öneririm.',
                    'icon':  light_rain
                }
                break;
            case weather.weather[0].description === "parçalı bulutlu":
                weather_suggest_list = {
                    'suggest': 'Bugün hava durumu güzel. Yer yer hava kapalı olacak. Rüzgar sert esecek. Dikkat et..:)',
                    'icon':  partly_cloudy
                }
                break;
            case weather.weather[0].description === "parçalı az bulutlu":
                weather_suggest_list = {
                    'suggest': 'Bugün hava durumu güzel. Yer yer hava kapalı olacak. Rüzgar sert esecek. Dikkat et..:)',
                    'icon':  partly_cloudy
                }
                break;
            default:
                weather_suggest_list = {
                    'suggest': 'Hava durumu önerisi bulunamadı.',
                    'icon': '',
                }
                break;
        }

        return weather_suggest_list
    }


    //!! GET Wheather Api  
    useEffect(() => {
        if (localStorage.getItem("_authToken")) {
           axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=K%C3%BC%C3%A7%C3%BCk%C3%A7ekmece&lang=tr&appid=c6951d8c03cf8b12b18547e9d46e2128`)
          .then(res => {
              dispatch(setWeatherState(res.data));
              setWeatherReady(true);
            })
          .catch(error => console.log(error))
        }
      }, []);


    return (
        <>
            <div id="rightSideContents" className="right-side-contents">
                <div className="right-side__cover">
                    <div className='create_event_list'>
                        <a href={routes.create.path}>
                            <img src={social_address} alt=''/>
                            <span>Gönderi oluştur</span>
                        </a>
                    </div>
                    
                        <div id="daily_weather_part" className="sum_weather_part">
                            {
                                !isweatherReady ?  
                                <>
                                    <div className={dark ? 'text-white text-center' : 'text-black text-center'}>
                                        Hava durumu yükleniyor...
                                    </div>
                                    <div className="loader w-100 d-flex justify-content-center align-items-center" style={{height:"150px"}}>
                                        <div className="inner one w-25 h-25"></div>
                                        <div className="inner two w-25 h-25"></div>
                                        <div className="inner three w-25 h-25"></div>
                                    </div>
                                </>
                                    :
                                <>
                                    <div className="weather-top">
                                        <div id="weather-icon" className="weather-icon w1">
                                            <img src={weatherState().icon} alt=''/>
                                        </div>
                                        <div className="weather-info">
                                            <div className="degree-number">
                                                <span id="degree-number">{Math.round(weather.main.temp)-273}°</span>
                                                <span>C</span>
                                            </div>
                                            <div className="weather-wind">
                                                <span id="weather-wind" className='m-2'>{Math.round(weather.wind.speed*3.6)} km/s</span> 
                                                <img alt='' src="https://img.icons8.com/external-flat-juicy-fish/20/000000/external-wind-weather-flat-flat-juicy-fish-2.png" />
                                            </div>
                                            <div className="weather-temperatur">
                                                <div className="highest">
                                                    <img alt='' src="https://img.icons8.com/ios-filled/20/FD334B/thermometer-up.png" />:
                                                    <span id="highest-temp"> {Math.round(weather.main.temp_max)-273}</span>°
                                                </div>
                                                <div className="lower">
                                                    <img alt='' src="https://img.icons8.com/ios-filled/20/0299FA/thermometer-down.png" />:
                                                    <span id="lower-temp"> {Math.round(weather.main.temp_min)-273}</span>°
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weather-bottom">
                                        <div id="weather-prop" className="weather-prop">
                                            {weather.weather[0].description}
                                        </div>
                                        <div className="recommendation">
                                            <img alt='' src="https://img.icons8.com/external-flat-juicy-fish/30/000000/external-warning-weather-flat-flat-juicy-fish.png" />
                                            <span>
                                                {weatherState().suggest}
                                            </span>
                                        </div>
                                    
                                    
                                    </div>
                                </>
                            }
                        </div>
                    
                    <div className="sum_trend_post_thisweek">
                        <div className="title">
                            <span className="bold">Bu Hafta</span>
                            <span>Trendleri</span>
                            <div></div>
                        </div>
                        <div className="trend-posts">
                            <a href="/#" className="trend-post">
                                <div className="left-post">
                                    <div className="post-title">
                                        5 GitHub Repositories for learning developers
                                    </div>
                                    <div className="post-time">
                                        -{`>`} 3 dakikalık
                                    </div>
                                </div>
                                <div className="right-post">
                                    <img src={IITC} alt="" />
                                </div>
                            </a>
                            <a href="/#" className="trend-post">
                                <div className="left-post">
                                    <div className="post-title">
                                        Refactoring If...Else Statement In JS
                                    </div>
                                    <div className="post-time">
                                    -{`>`} 5 dakikalık
                                    </div>
                                </div>
                                <div className="right-post">
                                    <img src={post6} alt="" />
                                </div>
                            </a>
                            <a href="/#" className="trend-post">
                                <div className="left-post">
                                    <div className="post-title">
                                        How to Install WSL 2 on Windows 10 (Updated)
                                    </div>
                                    <div className="post-time">
                                    -{`>`} 12 dakikalık
                                    </div>
                                </div>
                                <div className="right-post">
                                    <img src={post4} alt="" />
                                </div>
                            </a>
                            <a href="/#" className="trend-post">
                                <div className="left-post">
                                    <div className="post-title">
                                        Linux Mint's Sticky Notes App Works Great on Ubuntu
                                    </div>
                                    <div className="post-time">
                                    -{`>`} 15 dakikalık
                                    </div>
                                </div>
                                <div className="right-post">
                                    <img src={post5} alt="" />
                                </div>
                            </a>
                            <a href="/#" className="trend-post">
                                <div className="left-post">
                                    <div className="post-title">
                                        Firefox 95 Released, This is What’s New
                                    </div>
                                    <div className="post-time">
                                    -{`>`} 9 dakikalık
                                    </div>
                                </div>
                                <div className="right-post">
                                    <img src={post7} alt="" />
                                </div>
                            </a>
                        </div>
                        <div className="trend-tags">
                            <div className="table-head">
                                <div className="tag-name">
                                    Etiket adı
                                </div>
                                <div className="tag-number">
                                    Post
                                </div>
                            </div>
                            <ul className="trend-tag">
                                <li><a href="/#">#btk</a><span>143</span></li>
                                <li><a href="/#">#yazılım</a><span>125</span></li>
                                <li><a href="/#">#endüstri</a><span>118</span></li>
                                <li><a href="/#">#iuee</a><span>87</span></li>
                                <li><a href="/#">#mühendislik-fakültesi</a><span>82</span></li>
                                <li><a href="/#">#izu-kampus</a><span>55</span></li>
                                <li><a href="/#">#vizeler</a><span>43</span></li>
                                <li><a href="/#">#dersler</a><span>29</span></li>
                                <li><a href="/#">#okul-ücretleri</a><span>17</span></li>
                                <li><a href="/#">#mescitler</a><span>7</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default RightSide