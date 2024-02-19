import { Spin } from 'antd';
import React from 'react';


const LoadingComponent = () => {
    return (
        <div>
            <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0 right-0 z-[1000] bg-white bg-opacity-40 text-primary">
            <Spin size="large" />
            </div>
        </div>
    );
}

export default LoadingComponent;
