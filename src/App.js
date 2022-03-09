import React, {Suspense, useEffect, useState} from "react";
import {  
  BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate,
} from "react-router-dom";
import history from './history';
import Modal from 'react-modal';

import Loading from "./components/loading/loading";
import { useDispatch, useSelector } from "react-redux";
import {routes} from './routes';
import LoginPage from "./containers/pages/log/login-page/Login-Page";
import MainPage from "./containers/pages/main-page/Main-Page";
import AllPosts from "./containers/pages/all-posts-page/All-Posts";
import NotFoundPage from './containers/pages/not-found-page/NotFoundPage'
import StudentUserProfile from "./containers/pages/profile-page/student-profile-page/studentUserProfile";
import News from "./components/news/News";
import axios from "axios";
import { login } from "./stores/authSlice";
import Sports from "./containers/pages/sports/Sports";
import Football from "./containers/pages/sports/sport_branches/Football";
import PostDetail from "./containers/pages/post-detail-page/PostDetail";
import Discussion from "./containers/pages/discussions-page/Discussion";
import { setDarkMode } from '../src/stores/themeSlice';


Modal.setAppElement('#root')

const App = () => {
  const dark = useSelector(state => state.theme.dark)
  const dispatch = useDispatch()
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
        if (localStorage.getItem("_authToken")) {
          axios
          .get(`http://localhost:8000/api/v0/all-endpoints/auth-user-info/${localStorage.getItem("_user_id")}-${localStorage.getItem("_authToken")}`)
          .then(res => {
            dispatch(login(res.data));
          })
          .then(res2=> {
            //!! GET Site Settings  
            axios.get(`http://localhost:8000/api/v0/all-endpoints/auth-user-site-settings/${localStorage.getItem("_user_id")}`)
            .then(theme_res => {
                dispatch(setDarkMode(theme_res.data.dark_theme))
                setIsPageReady(true)
            })
          })
          .catch(error => console.log(error))
        }
  },[]);

  return (
    <div className={dark ? 'App darkApp' : 'App lightApp'}>
        <Router history={history}>
          <Suspense fallback={<Loading/>}>
              <Routes>
                { !localStorage.getItem("_authToken") ?
                  <>
                    <Route path={routes.login.path} element={<LoginPage/>} />
                    <Route path="*" element={<Navigate to="/login"/>} />
                  </> 
                  : 
                  <>
                    {!isPageReady ?
                      <>
                        <Route path="*" element={<Loading/>} />
                      </> 
                      : 
                      <>
                        { !localStorage.getItem("_authToken") ?
                              <>
                                <Route path={routes.login.path} element={<LoginPage/>} />
                                <Route path="*" element={<Navigate to="/login"/>} />
                              </>
                            :
                              <>
                                <Route path={routes.login.path}  element={<Navigate to={routes.main.path} />} />
                                <Route path={routes.main.path} element={<MainPage/>} />
                                <Route path={routes.posts.path} element={<AllPosts/>} />
                                <Route path={routes.student_user_profiles.path} element={<StudentUserProfile />} />
                                <Route path={routes.news.path} element={<News/>} />
                                <Route path={routes.posts.path + '/:postID'} element={<PostDetail />} />
                                <Route path={routes.sports.path} element={<Sports/>} />
                                <Route path={routes.sports.football.path} element={<Football/>} />
                                <Route path={routes.discussions.path} element={<Discussion/>} />
                                <Route path="*" element={<NotFoundPage/>} />
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
