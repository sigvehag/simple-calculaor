import * as React from 'react';

type ScreenProps = {
    currentNumber: string;
}

const Screen = ({currentNumber}: ScreenProps) => {
    return (<div className="screen"><p>{currentNumber}</p></div>)
}

export default Screen;