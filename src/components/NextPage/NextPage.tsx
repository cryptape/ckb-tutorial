import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import docs from '../../utils/docs.ts'
import './NextPage.scss'

interface NextPageProps {
    docName: string;
}

const NextPage: React.FC<NextPageProps> = ({ docName }) => {
    const navigate = useNavigate();
    const [route, setRoute] = useState({ firstLevel: '', secondLevel: '' });

    useEffect(() => {
        const docRoute = docs.find(doc => doc.name === docName);
        if (docRoute) setRoute(docRoute);
    }, [docName]);

    const handleClick = () => {
        navigate(route.secondLevel);
    };

    return (
        <div className="flex flex-row-reverse">
            <div className="next-page-container">
                <p>Next</p>
                <div className="next-page-btn" onClick={handleClick}>
                    {docName}
                </div>
            </div>
        </div>
    );
};

export default NextPage;
