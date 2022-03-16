import axios from 'axios';


//* GET
//? Auth User Api
export var Login_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/auth-user-info/${localStorage.getItem("_user_id")}-${localStorage.getItem("_authToken")}`)
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
//? Auth User Api
export var Site_Settings_Api = async () => {
    var result = await axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/auth-user-site-settings/${localStorage.getItem("_user_id")}`)
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
