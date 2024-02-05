import React from 'react';
// import { useLocation } from 'react-router-dom';
import HomeBtn from '../../assets/img/Home.png';
import ArrowRight from '../../assets/img/arrow-right.png';
import './BreadCrumbs.scss'

const BreadCrumbs: React.FC = () => {
    // const location = useLocation();
    // const pathnames = location.pathname.split("/").filter((x) => x);
    return (
        <div className="breadcrumb-wrapper flex items-center">
            {/*{pathnames.map((value, index) => {*/}
            {/*    const isLast = index === pathnames.length - 1;*/}
            {/*    const to = `/${pathnames.slice(0, index + 1).join("/")}`;*/}

            {/*    return isLast ? (*/}
            {/*        <span key={to}>{value}</span>*/}
            {/*    ) : (*/}
            {/*        <span key={to}>{value} / </span>*/}
            {/*    );*/}
            {/*})}*/}
            <img src={HomeBtn} className="home-btn mr-3" />
            <img src={ArrowRight} className="arrow-right-btn mr-3" />
            <p className="parent-catg mr-3">Onboarding Tutorials</p>
            <img src={ArrowRight} className="arrow-right-btn mr-3" />
            <p className="child-catg mr-3">Hello World</p>
        </div>
    );
};

export default BreadCrumbs;
