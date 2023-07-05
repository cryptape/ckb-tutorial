import React, { useState } from 'react'
import CopyBtn from '../../assets/img/copy.png'
import './CopyButton.scss'

interface CopyButtonProps {
    text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [showPopover, setShowPopover] = useState(false);

    const copyText = async () => {
        await navigator.clipboard.writeText(text);
        setShowPopover(true);
        setTimeout(() => {
            setShowPopover(false);
        }, 2000);
    };

    return (
        <div className="copy-btn-wrapper">
            {showPopover &&
                <div className="popover">
                    Copied!
                    <div className="popover-arrow"></div>
                </div>
            }
            <img
                className="code-block-copy-btn"
                src={CopyBtn}
                width={18}
                height={18}
                onClick={copyText}
                alt="Copy button"
            />
        </div>
    );
};

export default CopyButton;