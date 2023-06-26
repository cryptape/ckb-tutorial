import React from 'react'
// import './CodeBlock.scss';
import CopyBtn from '../../assets/img/copy.png'

interface CopyButtonProps {
    text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {

    const copyText = async () => {
        await navigator.clipboard.writeText(text);
    };

    return (
        <img
            className="code-block-copy-btn"
            src={CopyBtn}
            width={18}
            height={18}
            onClick={copyText}
            alt="Copy button"
        />
    );
};


export default CopyButton