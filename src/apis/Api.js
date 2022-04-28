import axios from 'axios';
import history from '../history';
import { routes } from '../routes';

const lclStorage = () => {
    var val = localStorage.getItem('lclStorage')
    return JSON.parse(val)
}


//* GET
//? Auth User Api
export var Login_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/auth-user-info/${lclStorage().user_id}-${lclStorage().authToken}`)
        .catch(function (error) {
            console.log(error)
            history.push(routes.notFound.path)
            window.location.reload();
        })
    return result
}


//* GET
//? Site Settings Api
export var Site_Settings_Api = async (user_id) => {
    var id = user_id ? user_id : lclStorage().user_id
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/auth-user-site-settings/${id}`)
        .catch(error => console.log(error))
    return result
}


//* GET
//? News Api ( With Filtered)
export var Filtered_News_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/news/news-with-filtered`)
        .catch(error => console.log(error))
    return result
}


//* GET
//? Last Posts Api ( With Filtered)
export var Filtered_Last_Posts_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/posts/post-with-filtered`)
        .catch(error => console.log(error))
    return result
}


//* GET
//? Single Post Api ( With Filtered)
export var SinglePost_Api = async (postID) => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/posts/post-with-filtered/${postID}`)
        .catch(error => console.log(error))
    return result
}



//* GET
//? Post Detail Api 
export var PostDetail_Api = async (postID) => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/posts/postId=${postID}/`)
        .catch(error => console.log(error))
    return result
}



//* GET
//? Related Posts Api 
export var RelatedPosts_Api = async (userId) => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/posts/related_posts/userId=${userId}/`)
        .catch(error => console.log(error))
    return result
}





//* GET
//? Wheather Api
export var Wheather_Api = async () => {
    var result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=K%C3%BC%C3%A7%C3%BCk%C3%A7ekmece&lang=tr&appid=c6951d8c03cf8b12b18547e9d46e2128`)
        .catch(error => console.log(error))
    return result
}


//* GET
//? Main Category Of Posts Api
export var MainCategories_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/posts/main-categories`)
        .catch(error => console.log(error))
    return result
}


//* GET
//? User Rank Api
export var UserRank_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/user-rank/${lclStorage().user_id}`)
        .catch(error => console.log(error))
    return result
}


//* GET
//? Custom User Rank Api
export var CustomUserRank_Api = async (id) => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/user-rank/${id}`)
        .catch(error => console.log(error))
    return result
}

//* GET
//? Discussions Api
export var Discussions_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/discussions/`)
        .catch(error => console.log(error))
    return result
}

//* GET
//? Topics Of Discussions Api
export var DiscussionsTopics_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/discussions/topics`)
        .catch(error => console.log(error))
    return result
}

//* GET
//? Single Discussions Api
export var SingleDiscussions_Api = async (discussionID) => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/discussions/${discussionID}`)
        .catch(error => console.log(error))
    return result
}


//* GET
//? Student User Profile Detail
export var StudentUserProfileDetail_Api = async (username) => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/std/${username}`)
        .catch(error => {
            console.log(error)
            history.push(routes.notFound.path)
            window.location.reload();
        })
    return result
}


//* GET
//? Student User Department 
export var StudentUserDepartment_Api = async (department) => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/std/department/${department}`)
        .catch(error => console.log(error))
    return result
}



//* GET
//? Mini Posts 
export var AllMiniPosts_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/posts/mini-posts/`)
        .catch(error => console.log(error))
    return result
}



//* GET
//? Mini Post Tags 
export var AllMiniPostTags_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/posts/mini-post-tags/`)
        .catch(error => console.log(error))
    return result
}



//* GET
//? All Appointments List 
export var AllAppointments_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/appointments/`)
        .catch(error => console.log(error))
    return result
}



//* GET
//? Single User Of Appointment List 
export var SingleUserOfAppointments_Api = async (id) => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/appointments/${id}`)
        .catch(error => console.log(error))
    return result
}



//* POST
//? Create Appointments Api
export var AppointmentPost_Api = async (data) => {
    var result = await axios(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/appointments/create/`, {
        auth: { username: lclStorage().authUser.username, password: lclStorage().user_password },
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: data ,
    })
    return result
}




//* POST
//? Login Api
export var Post_Login_Api = async (username, password) => {
    var result = await axios(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/login/`, {
        withCredentials: false,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: { username: username, password: password },
    })
    return result
}


//* PATCH
//? Site Settings Api
export var Patch_Site_Settings_Api = async (site_settings) => {
    console.log(site_settings.dark_theme)
    console.log(lclStorage())
    var result = await axios(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/auth-user-site-settings/${lclStorage().user_id}`, {
        auth: { username: lclStorage().authUser.username, password: lclStorage().user_password },
        credentials: 'include',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: { 'dark_theme': site_settings.dark_theme },
    })
        .catch(error => console.log(error))
    return result
}


//* PATCH
//? Patch Single Post Api ( With Filtered)
export var Patch_SinglePost_Api = async (postID, data) => {
    var result = await axios(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/posts/post-with-filtered/${postID}`, {
        auth: { username: lclStorage().authUser.username, password: lclStorage().user_password },
        credentials: 'include',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: JSON.stringify(data),
    })
        .catch(error => console.log(error))
    return result
}


//* PATCH
//? Follow/Unfollow Api ( With Filtered)
export var Follow_Unfollow_Api = async (followList) => {
    var result = await axios(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/student-user/studentId=${lclStorage().user_id}/`, {
        auth: { username: lclStorage().authUser.username, password: lclStorage().user_password },
        credentials: 'include',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: { 'following': followList },
    })
        .catch(error => console.log(error))
    return result
}


//* PATCH
//? Discussion Like Api
export var PatchDiscussionData_Api = async (discussionID, data) => {
    var result = await axios(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/discussions/${discussionID}`, {
        auth: { username: lclStorage().authUser.username, password: lclStorage().user_password },
        credentials: 'include',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: JSON.stringify(data),
    })
        .catch(error => console.log(error))
    return result
}



//* POST
//? Mini Post Post Api
export var PostMiniPost_Api = async (data) => {
    var result = await axios(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/posts/mini-posts/create`, {
        auth: { username: lclStorage().authUser.username, password: lclStorage().user_password },
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: data,
    })
        .catch(error => console.log(error))
    return result
}





//* DELETE
//? Delete Single Appointment Api
export var AppointmentDelete_Api = async (data) => {
    console.log("data : " , data.toString())
    var result = await axios(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/appointments/delete/${data.toString()}`, {
        auth: { username: lclStorage().authUser.username, password: lclStorage().user_password },
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
    })
    return result
}

