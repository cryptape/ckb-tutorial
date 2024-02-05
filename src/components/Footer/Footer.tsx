import React from 'react';
import Discord from '../../assets/img/discord.png'
import Github from '../../assets/img/github.png'
import Unknown from '../../assets/img/unknown.png'
import Twitter from '../../assets/img/twitter.png'
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer-wrapper">
            <div className="footer-content flex">
                <div className="ckb-info">
                    <div>CKB Tutorial</div>
                    <div className="flex mt-6 space-between">
                        <a className="discord mr-5">
                            <img src={Discord} />
                        </a>
                        <a className="github mr-5">
                            <img src={Github} />
                        </a>
                        <a className="unknown mr-5">
                            <img src={Unknown} />
                        </a>
                        <a className="twitter mr-5">
                            <img src={Twitter} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}


export default Footer;
