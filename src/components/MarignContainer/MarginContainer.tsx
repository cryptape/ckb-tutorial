import React from 'react';

interface MarginContainerProps {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    children: React.ReactNode;
}

const MarginContainer: React.FC<MarginContainerProps> = ({
     top = 0,
     right = 0,
     bottom = 0,
     left = 0,
     children,
 }) => {
    const style = {
        marginTop: `${top}px`,
        marginRight: `${right}px`,
        marginBottom: `${bottom}px`,
        marginLeft: `${left}px`,
    };

    return <div style={style}>{children}</div>;
};

export default MarginContainer;