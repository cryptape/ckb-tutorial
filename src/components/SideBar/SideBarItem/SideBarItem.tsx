import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideBarItem.scss'

type SidebarItemProps = {
    name: string;
    firstLevel: string;
    firstLevelText: string;
    secondLevel: string;
    secondLevelText: string;
    isOpen: boolean;
    onToggle: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ name, firstLevel, secondLevel, secondLevelText, isOpen, onToggle }) => {
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let currentPath = location.pathname;
        if(location.pathname == "/") {
            currentPath = '/Onboarding/HelloWorld'
        }
        const isActivePath = currentPath.includes(firstLevel) && currentPath.includes(secondLevel);
        setIsActive(isActivePath);
    }, [location.pathname, firstLevel, secondLevel]);

    return (
        <li className="flex flex-col">
            <button onClick={onToggle} className={`${isActive ? 'sidebar-active-text' : ''}`}>
                {name}
            </button>
            {isOpen && (
                <Link
                    to={`${firstLevel}${secondLevel}`}
                    className={`ml-2 bg-white text-sm ${isActive ? 'font-bold' : ''}`}
                >
                    {secondLevelText}
                </Link>
            )}
        </li>
    );
};

export default SidebarItem;
