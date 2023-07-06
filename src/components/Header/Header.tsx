import React from 'react';
import logo from '../../assets/img/logo.png';
import SearchBtn from '../../assets/img/search-btn.png'
import './Header.scss'
const Header: React.FC = () => {
    return (
        <header className="flex justify-between header-wrapper items-center">
            <div>
                <img src={logo} alt="logo" className="header-logo" />
                <div className="header-text">CKB Tutorial</div>
            </div>
            <div className="flex items-center search-bar">
                <img src={SearchBtn}/>
                <p>Search doc...</p>
            </div>
            <div className="mobile-search">
                <img src={SearchBtn}/>
            </div>
        </header>
    );
};

export default Header;
