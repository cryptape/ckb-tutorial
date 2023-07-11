import React, { useState, useEffect } from 'react';
import SidebarItem from './SideBarItem/SideBarItem';
import docs, { Doc } from '../../utils/docs.ts'
import { useLocation } from 'react-router-dom';
import DownArrow from '../../assets/img/arrow-down.png';
import UpArrow from '../../assets/img/arrow-up.png';
import SidebarIcon from '../../assets/img/collapsed-menu.png';
import './SiderBar.scss'

const Sidebar: React.FC = () => {
    const [openFirstLevel, setOpenFirstLevel] = useState<string | null>(null);
    const [secondLevelText, setSecondLevelText] = useState<string | null>(null);
    const [openStatus, setOpenStatus] = useState<boolean>(false)
    const handleToggle = (firstLevel: string) => {
        setOpenFirstLevel(openFirstLevel === firstLevel ? null : firstLevel);
    };

    const mobileToggle = () => {
        setOpenStatus(openStatus => !openStatus)
    }

    const location = useLocation();

    useEffect(() => {
        let currentPath = location.pathname;
        if (currentPath === '/') {
            currentPath = '/Onboarding/HelloWorld'
        }
        const matchingFirstLevel = docs.find(doc =>
            currentPath.includes(doc.firstLevel)
        );
        if (matchingFirstLevel) {
            setOpenFirstLevel(matchingFirstLevel.firstLevel);
            const secondLevelMatch = matchingFirstLevel.secondLevels.find(level =>
                currentPath.includes(level.secondLevel)
            );
            if (secondLevelMatch) {
                setSecondLevelText(secondLevelMatch.secondLevelText);
            }
        }
    }, [location]);

    const isMobile = window.innerWidth <= 768;
    const sideBarStyle = isMobile ? { display: openStatus ? 'block' : 'none' } : {};

    return (
        <div className="side-bar-wrapper">
            <img className="collapsed-menu" src={SidebarIcon} alt="Sidebar Icon" />
            <div className="collapsed-button flex items-center" onClick={mobileToggle}>
                {secondLevelText}
                <img
                    src={openStatus ? UpArrow : DownArrow}
                    alt="Toggle"
                />
            </div>
            <div className="side-bar-container" style={sideBarStyle}>
                {docs.map(({ firstLevel, firstLevelText, secondLevels }: Doc) => (
                    <div className="first-level-item" key={firstLevel}>
                        <div className="font-bold cursor-pointer" onClick={() => handleToggle(firstLevel)}>
                            <div className="first-level-container flex items-center justify-between">
                                <p>{firstLevelText}</p>
                                <img
                                    src={openFirstLevel === firstLevel ? UpArrow : DownArrow}
                                    alt="Toggle"
                                />
                            </div>
                        </div>
                        {openFirstLevel === firstLevel && (
                            <ul className="space-y-2">
                                {secondLevels.map(({ name, secondLevel, secondLevelText }) => (
                                    <SidebarItem
                                        key={name}
                                        isOpen={name === openFirstLevel}
                                        onToggle={() => handleToggle(name)}
                                        name={name}
                                        firstLevel={firstLevel}
                                        firstLevelText={firstLevelText}
                                        secondLevel={secondLevel}
                                        secondLevelText={secondLevelText}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
