import React, {useEffect, useState} from 'react';
import CopyButton from "../CopyButton/CopyButton.tsx";
import Prism from 'prismjs'
import './CodeBlock.scss'
import '../../assets/style/prism-solarizedlight.css';
import 'prismjs/components/prism-bash';

interface CodeBlockProps {
    children: React.ReactElement;
}

const urlPattern = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i;

Prism.languages.bash = Prism.languages.extend('bash', {
    'keyword': Prism.languages.insertBefore('bash', 'keyword', {
        'new-keyword': {
            pattern: /\b(clone|run|start)\b/,
            alias: ['clone', 'run', 'start']
        }
    }).keyword,
    'url': {
        pattern: urlPattern,
        greedy: true
    }
});

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
    let codeString = children.props.children || '';
    let className = children.props.className || '';
    const [fileName, setFileName] = useState("")
    const [code] = useState(() => {
        let lines = codeString.split('\n');
        if (lines[0].startsWith('file:')) {
            setFileName(lines[0].split(':')[1].trim());
            lines.shift();
        }
        return lines.join('\n');
    });
    useEffect(() => {
        Prism.highlightAll();
    }, [codeString]);

    const containsUrl = urlPattern.test(codeString);
    const isJavaScript = className.includes("language-javascript");
    const containsGit = codeString.includes('git');

    // If the codeString contains both a URL and 'git', add 'github' to the className
    if (containsUrl && containsGit) {
        className += " github";
    }

    return (
        <div className="code-block">
            <pre className={className}>
                <code>{code}</code>
            </pre>
            {(!containsUrl || containsGit) && !isJavaScript && <CopyButton text={codeString} />}
            {fileName && <div className="file-name-container">{ fileName }</div>}
        </div>
    );
};

export default CodeBlock;
