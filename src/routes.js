export const routes = {
    url: "http://127.0.0.1:8000",

    notFound:{
        path: "/404",
        title: "Not Found"
    },
    login:{
        path: "/login",
        title: "Login Page"
    },
    main:{
        path: "/",
        title: "Main Page"
    },
    posts:{
        path: "/posts",
        title: "All Posts",
        postDetail:{
            path: "/posts/:postID",
            title: "Post Detail"
        }
    },
    news:{
        path: "/news",
        title: "All News",
        newsDetail:{
            path: "/news/news-detail=:newsID",
            title: "News Detail"
        }
    },
    activities:{
        path: "/activities",
        title: "All Activities",
        activityDetail:{
            path: "/activities/activity-detail=:activityID",
            title: "Activity Detail"
        }
    },
    educations:{
        path: "/educations",
        title: "All Educations",
        educationDetail:{
            path: "/education/education-detail=:educationID",
            title: "Education Detail"
        }
    },
    student_user_profiles:{
        path: "/std/:username",
        title: "Student Profile",
    },
    sports:{
        path: "/sports",
        title: "All Sport Branch",
        football:{
            path: "/sports/football",
            title: "Football"
        },
        football_appointment:{
            path: "/sports/football/appointment",
            title: "Football Appointment"
        },
        healt:{
            path: "/sports/health/appointment",
            title: "Football Appointment"
        },
        basketball:{
            path: "/sports/basketball",
            title: "Basketball"
        }
    },
    discussions:{
        path: "/discussions",
        title: "Discussions",
        discussionDetail:{
            path: "/discussions/1",
            title: "Discussion Detail"
        }
    },
    create:{
        path: "/create",
        title: "Create",
    },
    
}


// import MainPage from "./containers/pages/main-page/Main-Page";
// import AllPosts from "./containers/pages/all-posts-page/All-Posts";
// import NotFoundPage from './containers/pages/not-found-page/NotFoundPage'
// import StudentUserProfile from "./containers/pages/profile-page/student-profile-page/studentUserProfile";
// import LoginPage from "./containers/pages/log/login-page/Login-Page";

// export const routes = [
    
//     {
//         title : 'Login Page',
//         path : '/login',
//         exact : true,
//         component : LoginPage,
//         auth : false,
//     },
//     {
//         title : 'Redirect Login Page',
//         path : '*',
//         exact : true, 
//         component : LoginPage,
//         auth : false,
//     },
//     {
//         title : 'Main Page',
//         path : '/',
//         exact : true,
//         component : MainPage,
//         auth : true,
//     },
//     {
//         title : 'All Posts Page',
//         path : '/posts',
//         exact : true,
//         component : AllPosts,
//         auth : true,
//     },
//     {
//         title : 'Student User Profile Page',
//         path : '/std/my-profile',
//         exact : true, 
//         component : StudentUserProfile,
//         auth : true,
//     },
//     {
//         title : '404 Page',
//         path : '*',
//         exact : true, 
//         component : NotFoundPage,
//         auth : true,
//     },
    
    
// ]
