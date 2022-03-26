import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Modal from 'react-modal';
import history from './history';

import Loading from "./components/loading/loading";
import LoginPage from "./containers/pages/log/login-page/Login-Page";
import MainPage from "./containers/pages/main-page/Main-Page";
import AllPosts from "./containers/pages/all-posts-page/All-Posts";
import NotFoundPage from './containers/pages/not-found-page/NotFoundPage'
import StudentUserProfile from "./containers/pages/profile-page/student-profile-page/studentUserProfile";
import News from "./components/news/News";
import Sports from "./containers/pages/sports/Sports";
import Football from "./containers/pages/sports/sport_branches/Football";
import PostDetail from "./containers/pages/post-detail-page/PostDetail";
import Discussion from "./containers/pages/discussions-page/Discussion";
import Create_post from "./containers/pages/create/create-post";
import { routes } from './routes';
import { Site_Settings_Api } from "../src/apis/Api"
import { useSelector } from "react-redux";
import Football_Appointment from "./containers/pages/sports/appointment/Football-Appointment";

Modal.setAppElement('#root')


const App = () => {

  const site_settings = useSelector(state => state.siteSettings.site_settings)
  const [isLogin, setIslogin] = useState(
    JSON.parse(localStorage.getItem('lclStorage')) ? 
    true : false,
  );


  const getApis = async () => {

    //* LocalStorage'dan verileri alıp JSON'a çevirdik
    var lclStorage = JSON.parse(localStorage.getItem("lclStorage"))
    
    if (lclStorage) {
      await Site_Settings_Api(lclStorage.user_id)
    } 

  }


  useEffect(() => {
    getApis()
    if (localStorage.getItem("lclStorage")) {
      setIslogin(true)
      getApis()
    }
  });


  return (
    <div className={site_settings.dark_theme ? 'App darkApp' : 'App lightApp'}>
      {!isLogin ?
          <LoginPage />
        :
          <Router history={history}>
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* <Route path={routes.login.path} element={<LoginPage />} /> */}
              
                {/* <Route path={routes.login.path} element={<Navigate to={routes.main.path} />} /> */}
                <Route path={routes.main.path} element={<MainPage />} />
                <Route path={routes.posts.path} element={<AllPosts />} />
                <Route path={routes.student_user_profiles.path} element={<StudentUserProfile />} />
                <Route path={routes.news.path} element={<News />} />
                <Route path={routes.posts.path + '/:postID'} element={<PostDetail />} />
                <Route path={routes.sports.path} element={<Sports />} />
                <Route path={routes.sports.football.path} element={<Football />} />
                <Route path={routes.sports.football_appointment.path} element={<Football_Appointment />} />
                <Route path={routes.discussions.path} element={<Discussion />} />
                <Route path={routes.create.path} element={<Create_post />} />
                <Route path={routes.notFound.path} element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
                
              </Routes>
            </Suspense>
          </Router>
      }
    </div>
  );
}

export default App;
