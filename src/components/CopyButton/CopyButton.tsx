import React, { useState } from 'react'
import CopyBtn from '../../assets/img/copy.png'
import CopySelectorBtn from '../../assets/img/copy-selector.png'
import './CopyButton.scss'

interface CopyButtonProps {
    text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [popoverText, setPopoverText] = useState('');
    const [showPopover, setShowPopover] = useState(false);
    const [hovering, setHovering] = useState(false);

    const copyText = async () => {
        await navigator.clipboard.writeText(text);
        setPopoverText('Copied!');
        setShowPopover(true);
        setTimeout(() => {
            if (!hovering) { // Only hide if not hovering
                setShowPopover(false);
            }
        }, 2000);
    };

    const mouseEnter = () => {
        setHovering(true);
        if (!showPopover) {
            setPopoverText('Copy Code');
            setShowPopover(true);
        }
    }

    const mouseLeave = () => {
        setHovering(false);
        setShowPopover(false);
    }

    return (
        <div className="copy-btn-wrapper">
            {showPopover &&
                <div className="popover">
                    {popoverText}
                    <div className="popover-arrow"></div>
                </div>
            }
            <img
                className="code-block-copy-btn"
                src={hovering ? CopySelectorBtn : CopyBtn}
                width={18}
                height={18}
                onClick={copyText}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                alt="Copy button"
            />
        </div>
    );
};

export default CopyButton;
