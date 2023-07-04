import React, {useEffect} from 'react';
import CopyButton from "../CopyButton/CopyButton.tsx";
import Prism from 'prismjs'
import './CodeBlock.scss'
import '../../assets/style/prism-solarizedlight.css';
import 'prismjs/components/prism-bash';


interface CodeBlockProps {
    children: React.ReactElement;
}
Prism.languages.bash = Prism.languages.extend('bash', {
    'keyword': Prism.languages.insertBefore('bash', 'keyword', {
        'new-keyword': {
            pattern: /\b(clone|run|start)\b/,
            alias: ['clone', 'run', 'start']
        }
    }).keyword
});

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
    const codeString = children.props.children || '';
    let className = children.props.className || '';

    useEffect(() => {
        Prism.highlightAll();
    }, []);

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
