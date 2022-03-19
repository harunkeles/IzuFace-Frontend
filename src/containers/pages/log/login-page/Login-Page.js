import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setPassword, login } from '../../../../stores/authSlice'
import { Alert } from '@mui/material';
import { useState } from 'react';
import { 
    Login_Api,
    Post_Login_Api, 
    Site_Settings_Api 
} from '../../../../apis/Api';

import login_page_bg from '../../../../assets/img/bg_images/log_images/login_page_bg.jpg'
import dark_logo from '../../../../assets/img/icons/logo/dark_logo.png';



function LoginPage() {
    
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)
    const [isError ,setIsError] = useState(false)

    const Set_LocalStorage_Settings = async(user_id,token,password,site_setting) => {
        
        // Başarılı olan login işleminden sonra LocalStorage'a bilgileri kayıt ediyoruz
        var LocalStorage = {
            authToken : token,
            user_id : user_id,
        }
        localStorage.setItem('lclStorage', JSON.stringify(LocalStorage))
        
        // Api'den giriş yapan kullanıcı bilgilerini çektik
        await Login_Api()
        .then(res =>{
            dispatch(login(res.data))
            LocalStorage = {
                authToken : token,
                user_id : user_id,
                user_password : password,
                authUser : res.data,
                site_settings :  site_setting
            }
            localStorage.setItem('lclStorage', JSON.stringify(LocalStorage))
        }).catch(error => { setIsError(true) })

    }

    const handleLogin = async() => {

        // Login olmak için api'ye bilgileri yolladık
        await Post_Login_Api(user.username,user.password)
        .then(async(res) => {
            console.log(res)

            // Api'den sayfa ayarlarını çektik
            var site_setting = {};
            await Site_Settings_Api(res.data.user_id)
            .then(site_setting_res =>{
                site_setting = site_setting_res.data
                console.log(site_setting_res.data)
            }).catch(error => { setIsError(true) })
            
            // LocalStorage'a kayıt edilecek değerler (type : dict)
            var user_id = res.data.user_id
            var token = res.data.token
            var password = user.password
            await Set_LocalStorage_Settings(user_id,token,password,site_setting)

            window.location.reload();

        })
        .catch(error => {console.log(error); setIsError(true)});
       
    }


    return (
        <>
            {isError ? <></> :

                <div id="login_page">
                    <div className="container login_page_cover">
                        <div className='login_bg_img'>
                            <img src={login_page_bg} alt=''/>
                        </div>
                        <div className="content">
                            {isError ?
                                <>
                                    <Alert className='warning' severity="error">
                                        <strong>Kullanıcı adı</strong> veya <strong>Şifresini</strong> yanlış girdiniz. 
                                    </Alert>
                                </>
                                : <></>
                            }
                            <div className='content_navbar'>
                                <div className='logo'>
                                    <img src={dark_logo} alt=''/>
                                </div>
                                <div className='menu'>
                                    <div className='stuudent'>
                                        <a href='/#'>
                                            Öğrenci
                                        </a>
                                    </div>
                                    <div className='teacher'>
                                        <a href='/#'>
                                            Öğretmen
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='inner_content'>

                                <div className='log_type'>
                                    ÖĞRENCİ GİRİŞİ
                                </div>
                                <div className="log_text">
                                    Giriş Yap
                                </div>

                                <div className=" input_row">
                                    <div className="input_style">
                                        <span>
                                            <input 
                                                className="balloon" 
                                                id="input_style_email" 
                                                type="text" 
                                                name="email"
                                                placeholder="soyad.ad"
                                                onChange={ (e) => dispatch(setUsername(e.target.value))} 
                                                src={dark_logo}
                                            />
                                            <label htmlFor="input_style_email">Kullanıcı Adı :</label>
                                            <i className="fa-solid fa-envelope-open-text"></i>
                                        </span>
                                    </div>
                                    <div className="input_style">
                                        <span>
                                            <input 
                                                className="balloon" 
                                                id="input_style_password" 
                                                type="password"
                                                name="password"
                                                placeholder="********"
                                                onChange={ (e) => dispatch(setPassword(e.target.value))}
                                            />
                                            <label htmlFor="input_style_password">Kullanıcı Şifre :</label>
                                            <i className="fa-solid fa-key"></i>
                                        </span>
                                    </div>
                                </div>
                            
                                <div className='btn_group'>
                                    <button
                                        type="button"
                                        className="btn btn-primary login_btn"
                                        onClick={handleLogin}>
                                            Giriş Yap
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary detail_btn"
                                        onClick={handleLogin}>
                                            Sayfa hakkında bilgi edin
                                    </button>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>

            }
        </>
    );
}

export default LoginPage