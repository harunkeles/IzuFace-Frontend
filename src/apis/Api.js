import axios from 'axios';

const lclStorage = () => {
    var val = localStorage.getItem('lclStorage') 
    return JSON.parse(val)
}


//* GET
//? Auth User Api
export var Login_Api = async () => {
    console.log(lclStorage())
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/auth-user-info/${lclStorage().user_id}-${lclStorage().authToken}`)
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
    return result
}

//* GET
//? Site Settings Api
export var Site_Settings_Api = async (user_id) => {
    console.log(user_id)
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
//? Last Api ( With Filtered)
export var Filtered_Last_Posts_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/posts/post-with-filtered`)
        .catch(error => console.log(error))
    return result
}

//* POST
//? Login Api
export var Post_Login_Api = async (username,password) => {
    var result = await  axios(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/login/`, {
                            withCredentials: false,
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', },
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
                            headers: {'Content-Type': 'application/json', },
                            data:{'dark_theme': site_settings.dark_theme},
                            })
                        .catch(error => console.log(error))
    return result
}
