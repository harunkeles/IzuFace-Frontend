import React, { Component } from 'react'

import izulogo from "../../assets/img/others/izulogo.png"
import IITC from '../../assets/img/others/IITC.jpg'
import post6 from '../../assets/img/others/post6.jpg'
import post7 from '../../assets/img/others/post7.jpg'
import post4 from '../../assets/img/others/post4.jpg'

class Announcements extends Component {
    render() {
        return (
            <>
                <div id="announcementsCard-1">
                    <div className="announcementsCard-1__cover">
                        <div className="announcements-title">
                            <div className="title">
                                {/* <img alt='' src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/40/FFC107/external-announcement-business-and-education-flatart-icons-outline-flatarticons.png" /> */}
                                <i className="fas fa-bullhorn"></i>
                                <span>
                                    Duyurular
                                </span>
                            </div>
                            <a href="/#" className="more">
                                <span>Daha fazla duyuru</span>
                                <i className="fas fa-angle-double-right"></i>
                            </a>
                        </div>
                        <div className="blockquote-list">
                            <div className="blockquote-card">
                                <div className="card-img">
                                    <img src={post4} alt="" />
                                </div>
                                <div className="card-content">
                                    <div className="text">
                                        <a href="/#">
                                            4 Ocak 2022 koronavirüs tablosu ve aşı haritası belli oldu!
                                        </a>
                                    </div>
                                    <div className="sub-info">
                                        <span>İzü Öğrenci İşleri</span>
                                        <div className="circle_divider"></div>
                                        <div>15 Temmuz</div>
                                    </div>
                                </div>
                                <div className='card-share'><i className="fas fa-share"></i></div>
                            </div>
                            <div className="blockquote-card">
                                <div className="card-img">
                                    <img src={izulogo} alt="" />
                                </div>
                                <div className="card-content">
                                    <div className="text">
                                        <a href="/#">
                                            Türkiye'den Yunanistan'a sert tepki: Gerçeklikten kopuk ve popülist iddialar
                                        </a>
                                    </div>
                                    <div className="sub-info">
                                        <span>İzü Spor Birimi</span>
                                        <div className="circle_divider"></div>
                                        <div>15 Aralık</div>
                                    </div>
                                </div>
                                <div className='card-share'><i className="fas fa-share"></i></div>
                            </div>
                            <div className="blockquote-card">
                                <div className="card-img">
                                    <img src={post7} alt="" />
                                </div>
                                <div className="card-content">
                                    <div className="text">
                                        <a href="/#">
                                            Fiyat İstikrarı Komitesi ikinci kez toplandı! İşte alınan kararlar
                                        </a>
                                    </div>
                                    <div className="sub-info">
                                        <span>İzü Dekanlık Yönetimi</span>
                                        <div className="circle_divider"></div>
                                        <div>15 Aralık</div>
                                    </div>
                                </div>
                                <div className='card-share'><i className="fas fa-share"></i></div>
                            </div>
                            <div className="blockquote-card">
                                <div className="card-img">
                                    <img src={post6} alt="" />
                                </div>
                                <div className="card-content">
                                    <div className="text">
                                        <a href="/#">
                                            2021-2022 Güz Dönemi Proje Teslim Tarihleri Hakkında
                                        </a>
                                    </div>
                                    <div className="sub-info">
                                        <span>İzü Spor, Kültür ve Sağlık Birimi</span>
                                        <div className="circle_divider"></div>
                                        <div>01 Ocak</div>
                                    </div>
                                </div>
                                <div className='card-share'><i className="fas fa-share"></i></div>
                            </div>
                            <div className="blockquote-card">
                                <div className="card-img">
                                    <img src={IITC} alt="" />
                                </div>
                                <div className="card-content">
                                    <div className="text">
                                        <a href="/#">
                                            Haiti Başbakanı Ariel Henry’e 1 Ocak'ta Bağımsızlık Günü kutlamaları için geldiği Gonaives şehrinde gerçekleştirilen suikast girişiminin yeni görüntüleri ortaya çıktı.
                                        </a>
                                    </div>
                                    <div className="sub-info">
                                        <span>İzü Spor Birimi</span>
                                        <div className="circle_divider"></div>
                                        <div>15 Aralık</div>
                                    </div>
                                </div>
                                <div className='card-share'><i className="fas fa-share"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Announcements