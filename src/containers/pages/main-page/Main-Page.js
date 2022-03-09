import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';


import LeftSideMenu from '../../../components/leftSide/LeftSideMenu'
import Loading from '../../../components/loading/loading';
import Announcements from '../../../components/announcements/Announcements';
import RightSide from '../../../components/rightSide/Right-Side';
import News from '../../../components/news/News';
import Activities from '../../../components/activities/Activities';
import LastPosts from '../../../components/posts/Last-Posts';
import Navbar from '../../../components/navbar/Navbar';
import { login } from '../../../stores/authSlice';
import { setDarkMode } from '../../../stores/themeSlice';


class MainPage extends Component {

    constructor(props) {
        console.log("MainPage")
        super(props);
        this.state = {
            news : {},
            posts : {},
            isPageReady: false,
            style:{},
        };
        //!! Sadece ilk girişte çalışması için kullandık
        axios
        .get(`http://localhost:8000/api/v0/all-endpoints/auth-user-info/${localStorage.getItem("_user_id")}-${localStorage.getItem("_authToken")}`)
        .then(res => {
            this.props.login(res.data);
        })
        .catch(error => console.log(error))
    }

    componentDidMount(){
        //!! Sadece ilk girişte çalışması için kullandık
        axios.get(`http://localhost:8000/api/v0/all-endpoints/auth-user-info/${localStorage.getItem("_user_id")}-${localStorage.getItem("_authToken")}`)
            .then(res => {
                this.props.login(res.data);
            })
            .catch(error => console.log(error))
        //!! GET Site Settings  
        axios.get(`http://localhost:8000/api/v0/all-endpoints/auth-user-site-settings/${localStorage.getItem("_user_id")}`)
            .then(theme_res => {
                this.props.setDarkTheme(theme_res.data.dark_theme)
            })
            .catch(error => console.log(error))
        //!! GET News Api  
        axios.get('http://127.0.0.1:8000/api/v0/news/news-with-filtered')
            .then(res => {
                this.setState({ news: res.data });
                //!! GET Last Api  
                axios.get('http://127.0.0.1:8000/api/v0/posts/post-with-filtered')
                    .then(res => {this.setState({ posts: res.data, isPageReady: true });})
                    })
            .catch(function (error) {
                if (error.response) 
                  // Request made and server responded
                  console.log(error.response.status);
                else if (error.request) 
                  // The request was made but no response was received
                  console.log(error.request);
                else 
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                
            })
    }


    render() {
        const {isPageReady,news,posts} = this.state;
        return (
            <>
                {!isPageReady ?
                    <div>
                        <Loading/>
                    </div>
                 : (
                    <>
                        <div id="main-page">
                            <Navbar isPageReady={isPageReady}/> 
                            <div className="main-page__cover">
                                <LeftSideMenu theme={this.props.site_theme} user={this.props.user} isPageReady={isPageReady}/>
                                <div className="middle-side-contents">
                                    <div className="middle-side__cover">
                                        {/* <Search/> */}
                                        <Announcements/>
                                        <News news={news}/>
                                        <Activities/>
                                        <LastPosts posts={posts}/>
                                    </div>
                                </div>
                                <RightSide/>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}


const mapStateToProps = state => ({
    site_theme: state.theme,
    user: state.auth
})


const mapDispatchToProps = (dispatch) => {
    return {
        login: (val) => dispatch(login(val)),
        setDarkTheme: (val) => dispatch(setDarkMode(val)),
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(MainPage);
