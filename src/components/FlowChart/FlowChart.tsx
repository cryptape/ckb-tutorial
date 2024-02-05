import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './FlowChart.scss'; // 引入样式文件
interface FlowchartProps {
    steps: string[];
}

const Flowchart: React.FC<FlowchartProps> = ({ steps }) => {
    return (
        <div className="flowchart">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="flowchart-step flex items-center">
                        <div className="step-index">{index + 1}</div>
                        <ReactMarkdown
                            className="flowchart-box"
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            children={step}
                        />
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Flowchart;
