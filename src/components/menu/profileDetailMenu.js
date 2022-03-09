import React, { useState } from 'react'
import { routes } from '../../routes';
import {NavLink} from 'react-router-dom';


import light_logo from '../../assets/img/icons/logo/light_logo.png';
import dark_logo from '../../assets/img/icons/logo/dark_logo.png';
import clubs from "../../assets/img/others/clubs.png"
import all_posts_icon from "../../assets/img/icons/all_post_icons/all_posts_icon.png"
import dark_news_icon from "../../assets/img/icons/news_icons/dark_news_icon.png"
import dark_activities_icon from "../../assets/img/icons/activities_icons/dark_activities_icon.png"
import light_activities_icon from "../../assets/img/icons/activities_icons/light_activities_icon.png"
import department_icon from "../../assets/img/icons/department_icons/department_icon.png"
import sport_icon from "../../assets/img/icons/sport_icons/sport_icon.png"
import home_page_icon_2 from "../../assets/img/icons/home_page_icons/home_page_icon_2.png"
import discussion_icon from '../../assets/img/icons/main_icons/discussions_icon.png'
import more_menu from '../../assets/img/icons/main_icons/more_menu.png'
import more_menu_color from '../../assets/img/icons/main_icons/more_menu_color.png'
import user_img from '../../assets/img/icons/main_icons/user.png'
import user_color from '../../assets/img/icons/main_icons/user_color.png'
import my_face from '../../assets/img/icons/main_icons/my_face.png'
import notifications from '../../assets/img/icons/main_icons/notifications.png'
import bookmark from '../../assets/img/icons/main_icons/bookmark.png'
import all_posts from '../../assets/img/icons/main_icons/all_posts.png'
import my_face_color from '../../assets/img/icons/main_icons/my_face_color.png'
import notifications_color from '../../assets/img/icons/main_icons/notifications_color.png'
import bookmark_color from '../../assets/img/icons/main_icons/bookmark_color.png'
import all_posts_color from '../../assets/img/icons/main_icons/all_posts_color.png'
import home_page_color from '../../assets/img/icons/main_icons/home_page_color.png'
import rank_icon from '../../assets/img/icons/main_icons/rank_icon.png'
import like_icon from '../../assets/img/icons/main_icons/like_icon.png'
import reliablity_icon from '../../assets/img/icons/main_icons/reliablity_icon.png'
import my_face_color2 from '../../assets/img/icons/main_icons/my_face_color2.png'
import notifications_color2 from '../../assets/img/icons/main_icons/notifications_color2.png'
import bookmark_color2 from '../../assets/img/icons/main_icons/bookmarks_color2.png'
import all_posts_color2 from '../../assets/img/icons/main_icons/all_posts_color2.png'
import home_page_color2 from '../../assets/img/icons/main_icons/home_page_color2.png'
import user_color2 from '../../assets/img/icons/main_icons/user_color2.png'
import more_menu_color2 from '../../assets/img/icons/main_icons/more_menu_color2.png'



function ProfileDetailMenu({theme,profileUser,user}) {

    const[ mystyle, setMystyle] = useState({display: "none"});
    const[ myAuthUserstyle, setMyAuthUserstyle] = useState({display: "none"});

    const more_menu_hover = () => {
        setMystyle({display: "flex"})
    }

    const more_menu_leave = () => {
        setMystyle({display: "none"})
    }

    const more_authUser_menu_hover = () => {
        setMyAuthUserstyle({display: "flex"})
    }

    const more_authUser_menu_leave = () => {
        setMyAuthUserstyle({display: "none"})
    }

  return (
    <>
        <div id='profileDetailMenu'>
            <div className='site-logo'>
                <img src={theme.dark ? dark_logo : light_logo} alt='' />
            </div>
            <div className='menu_content'>
                <div className='upper'>
                    <div className='authUser_account_menu'>
                            <div className='header'>HESAP BİLGİLERİM</div>
                            <div className='menu'>
                                <a href={`/std/@${user.authUser.username}`} className="myprofile">
                                    <img alt="" src={user_color2}/>
                                    <span>Profilim</span>
                                </a>
                                <a href="/#" className="mypage">
                                    <img alt=""  src={my_face_color2}/>
                                    <span>My Face</span>
                                </a>
                                <a href="/#" className="notification">
                                    <img alt="" src={notifications_color2} />
                                    <span>Bildirimler</span>
                                </a>
                                <a href="/#" className="my-favorities">
                                    <img alt="" src={bookmark_color2} />
                                    <span>Favoriler</span>
                                </a>
                            </div>
                    </div>
                    <div className='common_menu'>
                        <div className='header'>MENÜLER</div>
                        <div className='menu'>
                            <a href='/' className="main-page">
                                <img alt="" src={home_page_color2} />
                                <span>Anasayfa</span>
                            </a>
                            <a href={routes.posts.path} className="all_posts">
                                <img alt="" src={theme.dark ? all_posts_color2 : all_posts_color2} />
                                <span>Bütün Postlar</span>
                            </a>
                            <div className='menu_inner'>
                                <div className='more_menu' onMouseOver={more_menu_hover} onMouseOut={more_menu_leave}>
                                    <img alt="" src={more_menu_color2} />
                                    <span> Diğer Menüler </span>
                                </div>
                                <div style={mystyle} onMouseOver={more_menu_hover} onMouseOut={more_menu_leave} className='animate__animated animate__fadeInLeft menu_inner_menu'>
                                    <i className="fa-solid fa-angles-right"></i>
                                    <a href={routes.posts.path} className="news">
                                        <img alt="" src={dark_news_icon} />
                                        <span>Haberler</span>
                                    </a>
                                    <a href={routes.posts.path} className="activities">
                                        <img alt="" src={theme.dark ? dark_activities_icon : light_activities_icon} />
                                        <span>Etkinlikler</span>
                                    </a>
                                    <a href={routes.posts.path} className="educations">
                                        <img alt="" src={department_icon} />
                                        <span>Bölümler</span>
                                    </a>
                                    <a href={routes.posts.path} className="clups">
                                        <img alt="" src={clubs} />
                                        <span>Kulüpler</span>
                                    </a>
                                    <a href={routes.sports.path} className="sports">
                                        <img alt="" src={sport_icon} />
                                        <span>Spor</span>
                                    </a>
                                    <a href={routes.discussions.path} className="discussions">
                                        <img alt="" src={discussion_icon} />
                                        <span>Tartışmalar</span>
                                    </a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className='authUser_info' onMouseOver={more_authUser_menu_hover} onMouseOut={more_authUser_menu_leave} >
                    <div className='small_user_info'>
                        <div>
                            <img className="user_img" src={routes.url + user.authUser.more_info.profImage } alt="" />
                        </div>
                        <span className="user_fullname"> {user.authUser.first_name} {user.authUser.last_name} </span>
                    </div>
                    <div  style={myAuthUserstyle} className='auth_user_switch_menu animate__animated animate__fadeInUp'>
                        <div className='user_img'>
                            <img src={routes.url + user.authUser.more_info.profImage } alt="" />
                        </div>
                        <div className='auth_user_more_info'>
                            <span className="user_fullname"> {user.authUser.first_name} {user.authUser.last_name} </span>
                            <div className="info">
                                <div className="rank">
                                    <img alt="" src={rank_icon} />
                                    <span>{user.authUser.more_info.user_rank}</span>
                                </div>
                                <div className="follow">
                                    <img alt="" src={like_icon} />
                                    <span>{user.authUser.more_info.followers}</span>
                                </div>
                                <div className="reliable">
                                    <img alt="" src={reliablity_icon} />
                                    <span>5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfileDetailMenu