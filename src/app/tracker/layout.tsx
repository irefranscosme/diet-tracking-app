import React from 'react';

const TrackerLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <div className="h-full container mx-auto p-5">{children}</div>;
};

export default TrackerLayout;
