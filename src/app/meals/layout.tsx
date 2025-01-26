import React from 'react';

const MealsLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="h-full container mx-auto p-5 flex flex-col gap-5">
            {children}
        </div>
    );
};

export default MealsLayout;
