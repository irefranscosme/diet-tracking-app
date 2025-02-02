'use client';

import { logout } from '@/utils/actions/logout';
import React from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';

const Logout = () => {
    const handleLogout = async () => {
        await logout();
    };

    return (
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Logout
        </DropdownMenuItem>
    );
};

export default Logout;
