import React from 'react';

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="h-full flex container py-2 mx-auto p-5">{children}</div>
    );
};

export default DashboardLayout;
