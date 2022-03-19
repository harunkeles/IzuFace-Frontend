import React, { useState } from 'react'

import light_logo from '../../assets/img/icons/logo/light_logo.png'
import dark_logo from '../../assets/img/icons/logo/dark_logo.png'
import dark_mode_image from '../../assets/img/others/dark_mode.png'
import white_mode_image from '../../assets/img/others/white_mode.png'
import {
    Patch_Site_Settings_Api
} from "../../apis/Api"
import { useDispatch, useSelector } from 'react-redux'
import { setSiteSettings } from '../../stores/siteSettingsSlice'



const Navbar = () => {

    const [mystyle, setMystyle] = useState({display: "none"});
    const site_settings = useSelector(state => state.siteSettings.site_settings)
    const [theme_mode_image, seTheme_mode_image] = useState(!site_settings.dark_theme ? dark_mode_image : white_mode_image);
    const dispatch = useDispatch()


    // localStorage'dan verileri alıyorum tema rengini değiştirip tekrardan lcl'a atıyorum
    const themeHandler = async () => {
        var lclStorage = JSON.parse(localStorage.getItem('lclStorage'))
        lclStorage.site_settings.dark_theme =  lclStorage.site_settings.dark_theme ? false : true 
        localStorage.setItem('lclStorage' , JSON.stringify(lclStorage))
        await Patch_Site_Settings_Api(lclStorage.site_settings)
        console.log(lclStorage)
        dispatch(setSiteSettings(lclStorage.site_settings))
    }

    // Ayarlara hover olunca
    const user_page_settings_hover = () => {
        return setMystyle({display: "flex"})
    }

    // Ayarlara over olunca
    const user_page_settings_leave = () => {
        return setMystyle({display: "none"})
    }

    const dark_mode_checkbox_control = () => {
        site_settings.dark_theme ?  seTheme_mode_image(dark_mode_image) : seTheme_mode_image(white_mode_image)
    }

    const log_out = () => {
        localStorage.clear();
        window.location.reload();
    }


    return (
        <>
            <div id='navbar_comp'>
                <div className='navbar_comp_cover'>
                    <a href='/' className='left_side'>
                        <img alt='logo' src={site_settings.dark_theme ? dark_logo : light_logo} />
                    </a>
                    <div className='middle_side'>
                    </div>
                    <div className='right_side'>
                        <div className='settings-button' onMouseOver={user_page_settings_hover} onMouseOut={user_page_settings_leave} > <i className="fas fa-user-cog"></i> </div>
                        <div style={{display:mystyle.display}} onMouseOver={user_page_settings_hover} onMouseOut={user_page_settings_leave} className="page_settings_menu  animate__animated animate__slideInUp">
                            <div className="menu">
                                <ul className="menu-list">
                                    <li className="menu-item">
                                        <a href='/#'>
                                            <div className="menu-button"><i className="fas fa-cog"></i><span>Ayarlar</span></div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href='/#'>
                                            <div className="menu-button"><i className="fas fa-info-circle"></i><span>Site hakkında</span></div>
                                        </a>
                                    </li>
                                </ul>
                                <ul className="menu-list second">
                                    <li className=" dark_mode">
                                        <div className='dark_mode_cover'>
                                            <input type="checkbox"
                                                checked={(site_settings.dark_theme ? true : false)}
                                                name="checkbox" className="switch" onClick={themeHandler} onChange={dark_mode_checkbox_control} style={{ backgroundImage: `url(${theme_mode_image})` }} />
                                        </div>
                                    </li>
                                    <li className="menu-item">
                                        <div className="menu-button" onClick={log_out} ><i className="fas fa-sign-out-alt"></i><span>Çıkış yap</span></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Navbar
