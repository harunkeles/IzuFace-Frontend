import React from 'react'

import discussion_icon from '../../assets/img/icons/main_icons/discussions_icon.png'
import dark_activities_icon from "../../assets/img/icons/activities_icons/dark_activities_icon.png"
import light_activities_icon from "../../assets/img/icons/activities_icons/light_activities_icon.png"
import dark_news_icon from '../../assets/img/icons/news_icons/dark_news_icon.png'
import { useSelector } from 'react-redux'


function Search() {

    const theme = useSelector(state => state.theme)

    return (
        <>
            <div className="searchSection">
                <div className="search-helpers">
                    <ul>
                        <li className="create_post">
                            <a href="/#">
                                <div className="icon">
                                    {theme.dark ? <i style={{color:'white' }} className="fa-solid fa-square-plus"></i> : <i style={{color:'#1E2229' }} className="fa-solid fa-square-plus"></i>}
                                </div>
                                <span>Gönderi Oluştur</span>
                            </a>
                        </li>
                        <li className="news">
                            <a href="{% url 'all_news' %}">
                                <div className="icon">
                                    <img alt=""  src={dark_news_icon}/>
                                </div>
                                <span>Haber Oluştur</span>
                            </a>
                        </li>
                        <li className="activities">
                            <a href="/#">
                                <div className="icon">
                                    <img alt=""  src= {theme.dark ? dark_activities_icon : light_activities_icon } />
                                </div>
                                <span>Etkinlik Oluştur</span>
                            </a>
                        </li>
                        <li className="suggestions">
                            <a href="/#">
                                <div className="icon">
                                    <img alt="" src={discussion_icon} />
                                </div>
                                <span>Tartışma başlat</span>
                            </a>
                        </li>
                        {/* <li className="suggestions">
                            <a href="/#">
                                <div className="icon">
                                    <img alt="" src="https://img.icons8.com/external-victoruler-flat-victoruler/60/000000/external-suggestion-business-and-finance-victoruler-flat-victoruler.png" />
                                </div>
                                <span>Öneri Yap</span>
                            </a>
                        </li>
                        <li className="ask_question">
                            <a href="/#">
                                <div className="icon">
                                    <i className="fas fa-question"></i>
                                </div>
                                <span>Soru sor</span>
                            </a>
                        </li>
                        <li className="complaint">
                            <a href="/#">
                                <div className="icon">
                                    <img alt=""  src="https://img.icons8.com/color/44/000000/complaint.png" />
                                </div>
                                <span>Şikayet Et</span>
                            </a>
                        </li> */}

                    </ul>
                </div>
            </div>

        
        
        </>
    )
}

export default Search
