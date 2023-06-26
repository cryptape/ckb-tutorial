import React from 'react';
import CopyButton from "../CopyButton/CopyButton.tsx";
import './CodeBlock.scss'

interface CodeBlockProps {
    children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
    const codeString = children as string;
    return (
        <div className="code-block">
            <pre>
                <code>{codeString}</code>
            </pre>
            <CopyButton text={codeString} />
        </div>
    );
};

export default CodeBlock;
