import React, { FC } from 'react';
import './H4.scss'

interface MyStyledH1Props {
    children: React.ReactNode;
}

const MyStyledH4: FC<MyStyledH1Props> = ({ children }:MyStyledH1Props): JSX.Element => (
    <h1 className="myStyledH1">{children}</h1>
);

export default MyStyledH4;