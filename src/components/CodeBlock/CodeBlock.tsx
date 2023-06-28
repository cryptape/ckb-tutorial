import React from 'react';
import CopyButton from "../CopyButton/CopyButton.tsx";
import './CodeBlock.scss'

interface CodeBlockProps {
    children: React.ReactElement;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
    const codeString = children.props.children || '';
    const className = children.props.className || '';
    return (
        <div className="code-block">
            <pre className={className}>
                <code>{codeString}</code>
            </pre>
            <CopyButton text={codeString} />
        </div>
    );
};

export default CodeBlock;
