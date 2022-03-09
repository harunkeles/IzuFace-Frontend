import React, { Component } from 'react'
import { connect } from 'react-redux';


import btk from "../../assets/img/others/btk.jpg"
import ino from "../../assets/img/others/ino.jpg"
import izu_btk from "../../assets/img/others/izu-btk.jpg"
import izu_inovasyan from "../../assets/img/others/izu-inovasyan.jpg"
import izu_btk_2 from "../../assets/img/others/izu-btk-2.jpg"
import dark_activities_icon from "../../assets/img/icons/activities_icons/dark_activities_icon.png"
import light_activities_icon from "../../assets/img/icons/activities_icons/light_activities_icon.png"


class Activities extends Component {
    render() {
        return (
            <>
                <div id="activitiesCard-1">
                    <div className="activitiesCard-1__cover">
                        <div className="activities-title">
                            <div className="title">
                                <img alt='' src={this.props.theme.dark ? dark_activities_icon : light_activities_icon} />
                                <span>En Yeni</span> Etkinlikler
                            </div>
                            <a href="/#" className="more">
                                <span>Daha fazla duyuru</span>
                                <i className="fas fa-angle-double-right"></i>
                            </a>
                        </div>
                        <div className="activities-list">
                            <div className="activite">
                                <div className="card-img">
                                    <a href="/#">
                                        <img src={izu_btk} alt="" />
                                    </a>
                                </div>
                                <a href="/#" className="activite-owner">
                                    <div className="owner-img">
                                        <img src={btk} alt="" />
                                    </div>
                                    <div className="info">
                                        <div className="owner-name">
                                            İzü Bilişim Teknolojileri Kulübü
                                        </div>
                                        <div className="small-info">
                                            25 Haziran
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="activite">
                                <div className="card-img">
                                    <a href="/#">
                                        <img src={izu_inovasyan} alt="" />
                                    </a>
                                </div>
                                <a href="/#" className="activite-owner">
                                    <div className="owner-img">
                                        <img src={ino} alt="" />
                                    </div>
                                    <div className="info">
                                        <div className="owner-name">
                                            İzü İnovasyon Kulübü
                                        </div>
                                        <div className="small-info">
                                            25 Haziran
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="activite">
                                <div className="card-img">
                                    <a href="/#">
                                        <img src={izu_btk_2} alt="" />
                                    </a>
                                </div>
                                <a href="/#" className="activite-owner">
                                    <div className="owner-img">
                                        <img src={btk} alt="" />
                                    </div>
                                    <div className="info">
                                        <div className="owner-name">
                                            İzü Akedamino Kulübü
                                        </div>
                                        <div className="small-info">
                                            28 Aralık
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}



const mapStateToProps = state => ({
    theme: state.theme,
    user: state.auth
})



export default connect(mapStateToProps)(Activities)