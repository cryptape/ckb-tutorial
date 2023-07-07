import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import docs, { Doc } from '../../utils/docs.ts';
import NextPageButton from '../../assets/img/next-page.png'
import './NextPage.scss';

interface NextPageProps {
    docName: string;
}

const NextPage: React.FC<NextPageProps> = ({ docName }) => {
    const navigate = useNavigate();
    const [route, setRoute] = useState<Doc | null>(null);

    useEffect(() => {
        const docRoute = docs.find(doc => doc.secondLevels.some(level => level.name === docName));
        if (docRoute) setRoute(docRoute);
    }, [docName]);

    const handleClick = () => {
        if (route && route.secondLevels.length > 0) {
            navigate(route.secondLevels[0].secondLevel);
        }
    };

    return (
        <div className="next-page-wrapper flex flex-row-reverse">
            {route && (
                <div className="next-page-container">
                    <div className="mobile-next-container flex items-center" onClick={handleClick}>
                        <img className="mobile-next-icon" src={NextPageButton} alt="next" />
                        <div className="mobile-next-text-container">
                            <div className="action-text">Next</div>
                            <div className="title-text">Multi-purpose NFT</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NextPage;
