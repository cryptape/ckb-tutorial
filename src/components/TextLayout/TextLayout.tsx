import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownImageRowProps {
    markdown: string;
    image: string;
    ratio: number; // 图片占比，取值为0-1之间
}

const MarkdownImageRow: React.FC<MarkdownImageRowProps> = ({ markdown, image, ratio }) => {
    return (
        <div className="flex items-center" >
            <div>
                <ReactMarkdown children={markdown} />
            </div>
            <div style={{width: `${ratio}px`}}>
                <img src={image} alt="image" style={{width: '100%', height: 'auto'}}/>
            </div>
        </div>
    );
};


export default MarkdownImageRow;
