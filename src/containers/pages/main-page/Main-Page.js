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



const MainPage = () => {

    const [news, setNews] = useState({});
    const [posts, setPosts] = useState({});
    const [isPageReady, setIsPageReady] = useState(false);


    const getApis = async () => {
        await Filtered_News_Api()
            .then(res => {
                console.log("5")
                setNews(res.data)
                console.log("6")
            })
        await Filtered_News_Api()
            .then(res => {
                console.log("7")
                setNews(res.data)
                console.log("8")
            })
        await Filtered_Last_Posts_Api()
            .then(res => {
                console.log("9")
                setPosts(res.data)
                console.log("10")
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