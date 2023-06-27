import React from 'react';
import './FlowChart.scss'; // 引入样式文件
import ArrowImg from '../../assets/img/arrow.png'

interface FlowchartProps {
    steps: string[];
}

const Flowchart: React.FC<FlowchartProps> = ({ steps }) => {
    return (
        <div className="flowchart">
            {steps.map((step, index) => (
                <>
                    <div key={index} className="flowchart-step">
                        <div className="step-index">{index + 1}</div>
                        <div className="flowchart-box">{step}</div>
                    </div>
                    {index < steps.length - 1 && <img width={24} height={24} src={ArrowImg} className="flowchart-arrow" />}
                </>
            ))}
        </div>
    );
};

export default Flowchart;