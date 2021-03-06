import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { routes } from '../../routes';
import Loading from '../loading/loading';



import clubs from "../../assets/img/others/clubs.png"
import all_posts_icon from "../../assets/img/icons/all_post_icons/all_posts_icon.png"
import dark_news_icon from "../../assets/img/icons/news_icons/dark_news_icon.png"
import dark_activities_icon from "../../assets/img/icons/activities_icons/dark_activities_icon.png"
import light_activities_icon from "../../assets/img/icons/activities_icons/light_activities_icon.png"
import department_icon from "../../assets/img/icons/department_icons/department_icon.png"
import sport_icon from "../../assets/img/icons/sport_icons/sport_icon.png"
import home_page_icon_2 from "../../assets/img/icons/home_page_icons/home_page_icon_2.png"
import light_logo from '../../assets/img/icons/logo/light_logo.png'
import dark_logo from '../../assets/img/icons/logo/dark_logo.png'
import rank_icon from '../../assets/img/icons/main_icons/rank_icon.png'
import like_icon from '../../assets/img/icons/main_icons/like_icon.png'
import reliablity_icon from '../../assets/img/icons/main_icons/reliablity_icon.png'
import dark_lamp_icon from '../../assets/img/icons/main_icons/dark_lamp_icon.png'
import light_lamp_icon from '../../assets/img/icons/main_icons/light_lamp_icon.png'
import discussion_icon from '../../assets/img/icons/main_icons/discussions_icon.png'
import { setSiteSettings } from '../../stores/siteSettingsSlice';
import { Patch_Site_Settings_Api } from '../../apis/Api';




const Menu = () => {


    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.authUser)
    const site_settings = useSelector(state => state.siteSettings.site_settings)
  
    const [ isPageReady, setIsPageReady ] = useState(true);
  
    // localStorage'dan verileri alıyorum tema rengini değiştirip tekrardan lcl'a atıyorum
    const themeHandler = async () => {
        var lclStorage = JSON.parse(localStorage.getItem('lclStorage'))
        lclStorage.site_settings.dark_theme =  lclStorage.site_settings.dark_theme ? false : true 
        localStorage.setItem('lclStorage' , JSON.stringify(lclStorage))
        await Patch_Site_Settings_Api(lclStorage.site_settings)
        dispatch(setSiteSettings(lclStorage.site_settings))
    }


    const log_out = () => {
        localStorage.clear();
        window.location.reload();
    }


  return (
      <>
        {!isPageReady ?
            <div>
                <Loading/>
            </div>
        : (
            <>
                <div id="mainMenu">
                    <div className="pageCover">

                        <a href='/' className="izu_face_logo">
                            <img src={site_settings.dark_theme ? dark_logo : light_logo} alt="" />
                        </a>

                        <section className="banner">
                            <input type="checkbox" id="menu-control" className="menu-control" />
                            <div className="bg"></div>

                            <label htmlFor="menu-control" className="hamburger" >
                                <i className="hamburger__icon" style={site_settings.dark_theme ? {backgroundColor:"#fefeff"} : {backgroundColor:"#233B55"}}></i>
                                <i className="hamburger__icon" style={site_settings.dark_theme ? {backgroundColor:"#fefeff"} : {backgroundColor:"#233B55"}}></i>
                                <i className="hamburger__icon" style={site_settings.dark_theme ? {backgroundColor:"#fefeff"} : {backgroundColor:"#233B55"}}></i>

                            </label>


                            <aside className="sidebar">

                                <div className="auth_user_about">
                                    <img src={routes.url + user.more_info.profImage } alt="" />
                                    <div className="auth_user_info">
                                        <div className="user_name">
                                            {user.first_name} {user.last_name}
                                        </div>        
                                        <div className="info">
                                            <div className="rank">
                                                <img alt="" src={rank_icon} />
                                                <span>{user.more_info.user_rank}</span>
                                            </div>
                                            <div className="follow">
                                                <img alt="" src={like_icon} />
                                                <span>{user.more_info.followers}</span>
                                            </div>
                                            <div className="reliable">
                                                <img alt="" src={reliablity_icon} />
                                                <span>5%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <ul className="sidebar__menu">
                                    <li className="main-page">
                                        <a href={routes.main.path}>
                                            <img alt="" src={home_page_icon_2} />
                                            <span>Anasayfa</span>
                                        </a>
                                    </li>
                                    <li className="all_posts">
                                        <a href={routes.posts.path}>
                                            <img alt="" src={site_settings.dark_theme ? all_posts_icon : all_posts_icon} />
                                            <span>Bütün Postlar</span>
                                        </a>
                                    </li>
                                    <li className="news">
                                        <a href={routes.news.path} >
                                            <img alt="" src={dark_news_icon} />
                                            <span>Haberler</span>
                                        </a>
                                    </li>
                                    <li className="activities">
                                        <a href={routes.activities.path}>
                                            <img alt="" src={site_settings.dark_theme ? dark_activities_icon : light_activities_icon} />
                                            <span>Etkinlikler</span>
                                        </a>
                                    </li>
                                    <li className="educations">
                                        <a href={routes.educations.path}>
                                            <img alt="" src={department_icon} />
                                            <span>Bölümler</span>
                                        </a>
                                    </li>
                                    <li className="clups">
                                        <a href="/">
                                            <img alt="" src={clubs} />
                                            <span>Kulüpler</span>
                                        </a>
                                    </li>
                                    <li className="sport_branches">
                                        <a href={routes.sports.path}>
                                            <img alt="" src={sport_icon} />
                                            <span>Spor</span>
                                        </a>
                                    </li>
                                    <li className="sport_branches">
                                        <a href={routes.discussions.path}>
                                            <img alt="" src={discussion_icon} />
                                            <span>Tartışmalar</span>
                                        </a>
                                    </li>
                                    {/* <li className="suggestions">
                                        <a href="/">
                                            <img alt="" src="https://img.icons8.com/external-victoruler-linear-colour-victoruler/64/000000/external-suggestion-business-and-finance-victoruler-linear-colour-victoruler.png" />
                                            <span>Öneriler</span>
                                        </a>
                                    </li>
                                    <li className="complaint">
                                        <a href="/">
                                            <img alt='' src="https://img.icons8.com/color/48/000000/complaint.png" />
                                            <span>Şikayetler</span>
                                        </a>
                                    </li> */}
                                    <li className="izu-campus-info">
                                        <a href="https://kampus.izu.edu.tr/login">
                                            <img alt='' src="https://kampus.izu.edu.tr/js/favicon.ico" />
                                            <span>Kampüs Bilgi Sistemi</span>
                                        </a>
                                    </li>
                                    <li className="log-out">
                                        <a href="/" onClick={log_out}>
                                            <i className="fas fa-sign-out-alt"></i>
                                            <span>Çıkış yap</span>
                                        </a>
                                    </li>
                                </ul>

                                <ul className="sidebar__bottom-menu">
                                    <li>
                                        <img alt='' src="https://img.icons8.com/fluency/36/000000/username.png" />
                                    </li>
                                   
                                    <li>
                                        <img alt='' src="https://img.icons8.com/color/36/000000/appointment-reminders--v1.png" />
                                    </li>
                                    <li>
                                        <img onClick={themeHandler} alt='' src={site_settings.dark_theme ? dark_lamp_icon : light_lamp_icon} data-toggle="tooltip" data-placement="top" title="Gece görünümü"/>
                                    </li>
                                </ul>

                                <label htmlFor="menu-control" className="sidebar__close"></label>

                            </aside>


                        </section>
                    </div>
                </div>
            </>
            )
        }
      </>
  );
}



export default Menu
