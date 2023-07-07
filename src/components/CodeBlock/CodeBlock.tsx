import React, {useEffect} from 'react';
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
    const codeString = children.props.children || '';
    let className = children.props.className || '';

    useEffect(() => {
        Prism.highlightAll();
    }, []);

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
                <code>{codeString}</code>
            </pre>
            {(!containsUrl || containsGit) && !isJavaScript && <CopyButton text={codeString} />}
        </div>
    );
};



export default CodeBlock;
