import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import docs, { Doc } from '../../utils/docs.ts';
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
        <div className="flex flex-row-reverse">
            {route && (
                <div className="next-page-container">
                    <p>Next</p>
                    <div className="next-page-btn" onClick={handleClick}>
                        {docName}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NextPage;
