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
    Login_Api,
    Site_Settings_Api,
    Filtered_News_Api,
    Filtered_Last_Posts_Api
} from "../../../apis/Api"



const MainPage = () => {

    const [authUser, setAuthUser] = useState({});
    const [news, setNews] = useState({});
    const [posts, setPosts] = useState({});
    const [theme, setTheme] = useState(false);
    const [isPageReady, setIsPageReady] = useState(false);


    const getApis = async () => {
        await Login_Api()
            .then(res => {
                setAuthUser(res.data)
            })
        await Site_Settings_Api()
            .then(res => {
                setTheme(res.data.dark_theme)
            })
        await Filtered_News_Api()
            .then(res => {
                setNews(res.data)
            })
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


    useEffect(async () => {
        await getApis()
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
                            <Navbar isPageReady={isPageReady} />
                            <div className="main-page__cover">
                                <LeftSideMenu theme={theme} user={authUser} isPageReady={isPageReady} />
                                <div className="middle-side-contents">
                                    <div className="middle-side__cover">
                                        <Announcements />
                                        <News news={news} />
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