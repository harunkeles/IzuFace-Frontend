import React, { Component} from 'react'
import { connect } from 'react-redux';


import light_logo from '../../assets/img/icons/logo/light_logo.png'
import dark_logo from '../../assets/img/icons/logo/dark_logo.png'
import dark_mode_image from '../../assets/img/others/dark_mode.png'
import white_mode_image from '../../assets/img/others/white_mode.png'
import { setDarkMode } from '../../stores/themeSlice';
import axios from 'axios';



class Navbar extends Component {
    constructor(props){
        console.log("Navbar")
        super(props);
        this.state = {
            isHover : false,
            mystyle : {display: "none",},
            theme_mode_image : !this.props.theme.dark ? dark_mode_image : white_mode_image,
            theme : localStorage.getItem('dark_theme') 
        }
    }
  
    themeHandler = () => {
        let theme_dark_mode = this.props.theme.dark
        //!! PATCH Site Settings Controll  
        axios(`http://localhost:8000/api/v0/all-endpoints/auth-user-site-settings/${localStorage.getItem("_user_id")}`, {
                auth: { username: this.props.user.authUser.username, password: localStorage.getItem('user_password') },
                credentials: 'include',
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', },
                data:{'dark_theme':!theme_dark_mode},
            }).then(val =>this.props.setDarkMode(!theme_dark_mode))
        
    }
    
    user_page_settings_hover = () => {
        this.setState({ isHover: true, mystyle: {
            display: "flex",
        }});
    }

    user_page_settings_leave = () => {
        this.setState({ isHover: true, mystyle: {
            display: "none",
        }});
    }

    dark_mode_checkbox_control = () => {
        if (this.props.theme.dark === false) {
            this.setState({ theme_mode_image: white_mode_image });
        }
        else if (this.props.theme.dark === true) {
            this.setState({ theme_mode_image: dark_mode_image });
        }
    }

    log_out = () => {
        localStorage.clear();
        window.location.reload();
    }
    

    render() {
        return (
            <>
                {!this.props.isPageReady ?
                <></>
             : (
                <>
                    <div id='navbar_comp'>
                        <div className='navbar_comp_cover'>
                            <a href='/' className='left_side'>
                                <img alt='logo' src={this.props.theme.dark ? dark_logo : light_logo} />
                            </a>
                            <div className='middle_side'>
                            </div>
                            <div className='right_side'>
                                <div className='settings-button' onMouseOver={this.user_page_settings_hover} onMouseOut={this.user_page_settings_leave} > <i className="fas fa-user-cog"></i> </div>
                                <div style={this.state.mystyle} onMouseOver={this.user_page_settings_hover} onMouseOut={this.user_page_settings_leave} className="page_settings_menu  animate__animated animate__slideInUp">
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
                                                    checked={(this.props.theme.dark ? true : false)}
                                                    name="checkbox" className="switch" onClick={this.themeHandler} onChange={(this.dark_mode_checkbox_control)} style={{backgroundImage: `url(${this.state.theme_mode_image})`}}/>
                                                </div>
                                            </li>
                                            {this.props.theme.dark}
                                            <li className="menu-item">
                                                <div className="menu-button" onClick={this.log_out} ><i className="fas fa-sign-out-alt"></i><span>Çıkış yap</span></div>
                                            </li>   
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            
            </>
        )
    }
}




const mapStateToProps = state => ({
    theme: state.theme,
    user: state.auth
})

const mapDispatchToProps = (dispatch) => {
    return {
        setDarkMode: (val) => dispatch(setDarkMode(val))
    }
};


export default  connect(mapStateToProps, mapDispatchToProps)(Navbar);
