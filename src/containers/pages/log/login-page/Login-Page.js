import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setPassword, login, setIsUser } from '../../../../stores/authSlice'
import login_page_bg from '../../../../assets/img/bg_images/log_images/login_page_bg.jpg'
import light_logo from '../../../../assets/img/icons/logo/light_logo.png';
import dark_logo from '../../../../assets/img/icons/logo/dark_logo.png';
import { Alert, AlertTitle } from '@mui/material';
import { useEffect, useState } from 'react';


function LoginPage() {
    
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)
    const [isError ,setIsError] = useState(false)


    const handleLogin = () => {
        axios(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/login/`, {
            withCredentials: false,
            method: 'POST',
            headers: {'Content-Type': 'application/json', },
            data: { username: user.username, password: user.password },
        })
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem('user_password', user.password)
                localStorage.setItem('_authToken', res.data.token)
                localStorage.setItem('_user_id', res.data.user_id)
                if (!localStorage.getItem('dark_theme')) {
                    localStorage.setItem('dark_theme', false)
                }
                dispatch(setIsUser(true))
                dispatch(login(res.data));
                window.location.reload();
            }
        })
        .catch(error => {setIsError(true)});
    }


    return (
        <>
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

        </>
    );
}

export default LoginPage