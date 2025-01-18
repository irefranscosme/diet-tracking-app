import React from 'react';

const TrackerLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="h-full flex  items-center container justify-center mx-auto  ">
            {children}
        </div>
    );
};

export default TrackerLayout;
