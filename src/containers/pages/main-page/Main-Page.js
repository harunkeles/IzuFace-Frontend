import React, { useEffect, useState } from 'react'

import LeftSideMenu from '../../../components/leftSide/LeftSideMenu'
import Loading from '../../../components/loading/loading';
import Announcements from '../../../components/announcements/Announcements';
import RightSide from '../../../components/rightSide/Right-Side';
import News from '../../../components/news/News';
import Activities from '../../../components/activities/Activities';
import LastPosts from '../../../components/posts/Last-Posts';
import Navbar from '../../../components/navbar/Navbar';
import {
    Filtered_News_Api,
    Filtered_Last_Posts_Api
} from "../../../apis/Api"
import { routes } from '../../../routes';
import Sentiments from '../sentiments/Sentiments';



const MainPage = () => {

    const [news, setNews] = useState({});
    const [posts, setPosts] = useState({});
    const [isPageReady, setIsPageReady] = useState(false);


    const getApis = async () => {
        await Filtered_News_Api()
            .then(res => {
                setNews(res.data)
            })
        await Filtered_Last_Posts_Api()
            .then(res => {
                setPosts(res.data)
            })
            .then(res => { setIsPageReady(true) })
            .catch(error => { setIsPageReady(false) })
    }


    useEffect(() => {
        getApis()
    }, []);



    return (
        <>
            {!isPageReady ?
                <div>
                    <Loading />
                </div>
                : (
                    <>
                        <div id="main-page">
                            <Navbar />
                            <div className="main-page__cover">
                                <LeftSideMenu />
                                <div className="middle-side-contents">
                                    <div className="middle-side__cover">
                                        <div className='sentiment-row'>
                                            <span>Duygulara göre paylaşımlar</span>
                                            <div className='buttons'>
                                                <a href={routes.sentiments.path+1}>Mükemmel</a>
                                                <a href={routes.sentiments.path+2}>Çok iyi</a>
                                                <a href={routes.sentiments.path+3}>İyi</a>
                                                <a href={routes.sentiments.path+4}>Eh işte</a>
                                                <a href={routes.sentiments.path+5}>Kötü</a>
                                            </div>
                                        </div>
                                        <Announcements />
                                        <News />
                                        <Activities />
                                        <LastPosts posts={posts} />
                                    </div>
                                </div>
                                <RightSide />
                            </div>
                        </div>
                    </>
                )}
        </>
    );

}

export default MainPage