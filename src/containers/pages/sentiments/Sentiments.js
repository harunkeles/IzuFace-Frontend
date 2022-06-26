import React, { useEffect, useState } from 'react'
import { AllMiniPostsWithCategory_Api, Filtered_News_Api } from '../../../apis/Api';
import LeftSideMenu from '../../../components/leftSide/LeftSideMenu';
import Loading from '../../../components/loading/loading';
import Navbar from '../../../components/navbar/Navbar';
import football_page_main_img from '../../../assets/img/bg_images/sports_page_images/football_page_main_img.png';
import rank_icon from '../../../assets/img/icons/main_icons/rank_icon.png';
import calendar_icon from '../../../assets/img/icons/main_icons/calendar_icon.png';
import Admin_Resim from '../../../assets/img/others/Admin_Resim.jpg';
import upvote_icon from '../../../assets/img/icons/main_icons/upvote_icon.png'
import read_more from '../../../assets/img/icons/main_icons/read_more.png'
import izuspor from '../../../assets/img/aaa.png'
import { routes } from '../../../routes';

import Moment from 'moment';
import 'moment/locale/tr'

function Sentiments() {

    const [isPageReady, setIsPageReady] = useState(false);
    const [data, setData] = useState({});
    const [path, setPath] = useState(window.location.pathname.split('/')[2])


    const getApis = async () => {
        await AllMiniPostsWithCategory_Api(path)
            .then(res => {
                setData(res.data)
                setIsPageReady(true)
            })
    }

    useEffect(() => {
        getApis()
    }, []);

    console.log(data)

    return <>
        {
            !isPageReady ?
                <Loading />
                :
                <>
                    <div id="Sentiments">
                        <Navbar />
                        <div className="Sentiments__cover">
                            <LeftSideMenu />
                            <div className="middle-side-contents">
                                <h2>
                                    {(() => {
                                        if (path == 1) {
                                            return "Mükemmel Duyguda Gönderiler"
                                        } else if (path == 2) {
                                            return "iyi Duyguda Gönderiler"
                                        } else if (path == 3) {
                                            return "Eh işte Duygusunda Gönderiler"
                                        } else if (path == 4) {
                                            return "Kötü Duygulu Gönderiler"
                                        } else if (path == 5) {
                                            return "Nefretlik Gönderiler"
                                        }
                                    })()}
                                </h2>
                                <div className='contents'>
                                    {
                                        Object.values(data.mini_posts).map((res, index) => {
                                            return <div key={index} className='post_card'>
                                                <div className='content'>
                                                    <div className='left_side'>
                                                        <img alt='' src={routes.url + '/media/' + res.image} />
                                                    </div>
                                                    <div className='right_side'>
                                                        <div className='header'>
                                                            {res.text}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='post_info'>

                                                </div>
                                                <div className='post_footer'>
                                                    <div className='category'>
                                                        {(() => {
                                                            if (path == 1) {
                                                                return "Mükemmel"
                                                            } else if (path == 2) {
                                                                return "Çok iyi"
                                                            } else if (path == 3) {
                                                                return "İyi"
                                                            } else if (path == 4) {
                                                                return "Eh işte"
                                                            } else if (path == 5) {
                                                                return "Kötü"
                                                            }
                                                        })()}
                                                    </div>
                                                    <div className='post_date'>
                                                        <img alt='' src={calendar_icon} />
                                                        <span>{Moment(res.created_date).format('L') + ' ' + Moment(res.created_date).format('LT')}</span>
                                                    </div>
                                                    <a href={routes.sports.football.path} className='post_button'>
                                                        <span> DETAY </span>
                                                        <img alt='' src={read_more} />
                                                        <img alt='' src={read_more} />
                                                        <img alt='' src={read_more} />
                                                    </a>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        }
    </>;
}



export default Sentiments