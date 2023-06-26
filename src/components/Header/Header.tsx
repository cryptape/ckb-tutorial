import React from 'react';
import logo from '../../assets/img/logo.png';
import SearchBtn from '../../assets/img/search-btn.png'
import './Header.scss'
const Header: React.FC = () => {
    return (
        <header className="flex justify-between header-wrapper items-center">
            <div>
                <img src={logo} alt="logo" className="header-logo" />
            </div>
            <div className="flex items-center search-bar">
                <img src={SearchBtn}/>
                <p>Search doc...</p>
            </div>
        </header>
    );
};

export default Header;
