import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes';


import clubs from "../../assets/img/others/clubs.png"
import all_posts_icon from "../../assets/img/icons/all_post_icons/all_posts_icon.png"
import dark_news_icon from "../../assets/img/icons/news_icons/dark_news_icon.png"
import dark_activities_icon from "../../assets/img/icons/activities_icons/dark_activities_icon.png"
import light_activities_icon from "../../assets/img/icons/activities_icons/light_activities_icon.png"
import department_icon from "../../assets/img/icons/department_icons/department_icon.png"
import sport_icon from "../../assets/img/icons/sport_icons/sport_icon.png"
import home_page_icon_2 from "../../assets/img/icons/home_page_icons/home_page_icon_2.png"
import rank_icon from '../../assets/img/icons/main_icons/rank_icon.png'
import like_icon from '../../assets/img/icons/main_icons/like_icon.png'
import reliablity_icon from '../../assets/img/icons/main_icons/reliablity_icon.png'
import discussion_icon from '../../assets/img/icons/main_icons/discussions_icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../stores/authSlice';
import { Login_Api } from '../../apis/Api';



function LeftSideMenu() {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.authUser)
    const site_settings = useSelector(state => state.siteSettings.site_settings)
    const [style, setStyle] = useState({ display: 'none' });
    const [closeButton, setCloseButton] = useState({ display: 'none' });

    const updateStyle = () => {
        const new_style = {
            display: 'flex',
            width: '100%',
            height: '100%',
            position: 'absolute',
            background: '#515152',
            opacity: '0.3'
        }
        setStyle(new_style);
        setCloseButton({ display: 'flex', transform: 'rotate(45deg) !important' });
    }

    const updateStyleClose = () => {
        setCloseButton({ display: 'none' });
        setStyle({ display: 'none' });
    }

    const getApis = async () => {
        await Login_Api()
            .then(res => { dispatch(login(res.data)); })
    }

    useEffect(() => {
        getApis()
    }, [])


    return (
        <>
            <div id="bg-blur" style={style}></div>
            <div id="leftSideMenu" className="left-side-fixed-menu">
                <input type="checkbox" id="menu-control" className="menu-control" />
                <label htmlFor="menu-control" className="animate__animated animate__backInLeft sidebar__close" style={closeButton} onClick={updateStyleClose}></label>
                <div className="side-cover">
                    <label htmlFor="menu-control" className="hamburger" onClick={updateStyle}>
                        <i className="hamburger__icon"></i>
                        <i className="hamburger__icon"></i>
                        <i className="hamburger__icon"></i>
                    </label>
                    <div className="all-menu-list">
                        <div className="list-about-user">
                            <div className="auth_user">
                                <div className="user-info">
                                    <img className="user-img" src={routes.url + user.more_info.profImage} alt="" />
                                    <div className="info">
                                        <div className="rank animate__animated animate__backInLeft">
                                            <img alt="" src={rank_icon} />
                                            <span>{user.more_info.user_rank}</span>
                                        </div>
                                        <div className="follow animate__animated animate__backInLeft">
                                            <img alt="" src={like_icon} />
                                            <span>{user.more_info.followers}</span>
                                        </div>
                                        <div className="reliable animate__animated animate__backInLeft">
                                            <img alt="" src={reliablity_icon} />
                                            <span>5%</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="user-name animate__animated animate__backInLeft"> {user.first_name} {user.last_name} </span>
                            </div>
                            <div className="auth_user_menus">
                                <a href={`/std/@${user.username}`} className="myprofile">
                                    <img alt="" src="https://img.icons8.com/external-sbts2018-outline-sbts2018/50/8D939F/external-profile-social-media-basic-1-sbts2018-outline-sbts2018.png" />
                                    <span>Profilim</span>
                                </a>
                                <a href="/#" className="mypage">
                                    <img alt="" src="https://img.icons8.com/48/8D939F/login-as-user.png" />
                                    <span>My Face</span>
                                </a>
                                <a href="/#" className="notification">
                                    <img alt="" src="https://img.icons8.com/color/40/000000/appointment-reminders--v1.png" />
                                    <span>Bildirimler</span>
                                </a>
                                <a href="/#" className="my-favorities">
                                    <img alt="" src="https://img.icons8.com/fluency/36/000000/bookmark-ribbon.png" />
                                    <span>Favoriler</span>
                                </a>
                            </div>
                        </div>
                        <div className="list-global-menu">
                            <nav>
                                <NavLink to={routes.main.path} activeclassname="active" className="navlink main-page">
                                    <div>
                                        <img alt="" src={home_page_icon_2} />
                                        <span>Anasayfa</span>
                                    </div>
                                </NavLink>
                                <NavLink to={routes.posts.path} activeclassname="active" className="navlink all_posts">
                                    <div>
                                        <img alt="" src={site_settings.dark_theme ? all_posts_icon : all_posts_icon} />
                                        <span>B??t??n Postlar</span>
                                    </div>
                                </NavLink>
                                <NavLink to={routes.news.path} activeclassname="active" className="navlink news">
                                    <div>
                                        <img alt="" src={dark_news_icon} />
                                        <span>Haberler</span>
                                    </div>
                                </NavLink>
                                <NavLink to={routes.activities.path} activeclassname="active" className="navlink activities">
                                    <div>
                                        <img alt="" src={site_settings.dark_theme ? dark_activities_icon : light_activities_icon} />
                                        <span>Etkinlikler</span>
                                    </div>
                                </NavLink>
                                <NavLink to={routes.educations.path} activeclassname="active" className="navlink educations">
                                    <div>
                                        <img alt="" src={department_icon} />
                                        <span>B??l??mler</span>
                                    </div>
                                </NavLink>
                                <NavLink to="/std/my-profile" activeclassname="active" className="navlink clups">
                                    <div>
                                        <img alt="" src={clubs} />
                                        <span>Kul??pler</span>
                                    </div>
                                </NavLink>
                                <NavLink to={routes.sports.path} activeclassname="active" className="navlink sports">
                                    <div>
                                        <img alt="" src={sport_icon} />
                                        <span>Spor</span>
                                    </div>
                                </NavLink>
                                <NavLink to={routes.discussions.path} activeclassname="active" className="navlink discussions">
                                    <div>
                                        <img alt="" src={discussion_icon} />
                                        <span>Tart????malar</span>
                                    </div>
                                </NavLink>
                                {/* <NavLink to="/std/my-profile" activeclassname="active" className="navlink suggestions">
                                    <div>
                                        <img alt="" src="https://img.icons8.com/external-victoruler-linear-colour-victoruler/64/000000/external-suggestion-business-and-finance-victoruler-linear-colour-victoruler.png" />
                                        <span>??neriler</span>
                                    </div>
                                </NavLink> */}
                                {/* <NavLink to="/std/my-profile" activeclassname="active" className="navlink complaint">
                                    <div>
                                        <img alt="" src="https://img.icons8.com/color/48/000000/complaint.png" />
                                        <span>??ikayetler</span>
                                    </div>
                                </NavLink> */}
                                <a href="https://kampus.izu.edu.tr/login" className="navlink izu-campus-info">
                                    <div>
                                        <img alt="" src="https://kampus.izu.edu.tr/js/favicon.ico" />
                                        <span>Kamp??s Bilgi Sistemi</span>
                                    </div>
                                </a>

                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LeftSideMenu;


