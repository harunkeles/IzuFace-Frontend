import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import history from './history';
import Modal from 'react-modal';


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
import { Login_Api, Site_Settings_Api } from "../src/apis/Api"

Modal.setAppElement('#root')



const App = () => {

  const [theme, setTheme] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);


  const getApis = async () => {
    if (localStorage.getItem("_authToken")) {
      await Login_Api()
        .then(res => {
          console.log(res.data)
        })
      await Site_Settings_Api()
        .then(res => {
          setTheme(res.data.dark_theme)
          console.log(theme)
          setIsPageReady(true)
        })
        .catch(error => { setIsPageReady(false) })
    }
  }

  useEffect(async () => {
    await getApis()
  }, []);



  return (
    <div className={theme ? 'App darkApp' : 'App lightApp'}>
      <Router history={history}>
        <Suspense fallback={<Loading />}>
          <Routes>
            {!localStorage.getItem("_authToken") ?
              <>
                <Route path={routes.login.path} element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
              :
              <>
                {!isPageReady ?
                  <>
                    <Route path="*" element={<Loading />} />
                  </>
                  :
                  <>
                    {!localStorage.getItem("_authToken") ?
                      <>
                        <Route path={routes.login.path} element={<LoginPage />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                      </>
                      :
                      <>
                        <Route path={routes.login.path} element={<Navigate to={routes.main.path} />} />
                        <Route path={routes.main.path} element={<MainPage />} />
                        <Route path={routes.posts.path} element={<AllPosts />} />
                        <Route path={routes.student_user_profiles.path} element={<StudentUserProfile />} />
                        <Route path={routes.news.path} element={<News />} />
                        <Route path={routes.posts.path + '/:postID'} element={<PostDetail />} />
                        <Route path={routes.sports.path} element={<Sports />} />
                        <Route path={routes.sports.football.path} element={<Football />} />
                        <Route path={routes.discussions.path} element={<Discussion />} />
                        <Route path={routes.create.path} element={<Create_post />} />
                        <Route path="*" element={<NotFoundPage />} />
                      </>
                    }
                    <Route path="*" element={<Navigate to={routes.login.path} replace={true} />} />
                  </>
                }
              </>
            }
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
