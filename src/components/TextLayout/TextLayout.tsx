import React from 'react';
import ReactMarkdown from 'react-markdown';
import './TextLayout.scss'

interface MarkdownImageRowProps {
    markdown: string;
    image: string;
    ratio: number; // 图片占比，取值为0-1之间;
    reverse: boolean; // 建议使用小写的 boolean 类型，而非大写的 Boolean
}

const MarkdownImageRow: React.FC<MarkdownImageRowProps> = ({ markdown, image, ratio, reverse = false }) => {
    return (
        <div className="flex items-center" >
            {reverse ?
                <>
                    <div style={{width: `${ratio}px`}}>
                        <img src={image} alt="image" style={{width: '100%', height: 'auto'}}/>
                    </div>
                    <div className="markdown-container">
                        <ReactMarkdown children={markdown} />
                    </div>
                </>
                :
                <>
                    <div>
                        <ReactMarkdown children={markdown} />
                    </div>
                    <div style={{width: `${ratio}px`}}>
                        <img src={image} alt="image" style={{width: '100%', height: 'auto'}}/>
                    </div>
                </>
            }
        </div>
    );
};


export default MarkdownImageRow;
