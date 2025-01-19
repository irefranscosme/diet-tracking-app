import React from 'react';
import {
    SelectItem,
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

const MonthSelect = () => {
    return (
        <Select>
            <SelectTrigger className="w-[75px]">
                <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Jan</SelectItem>
                <SelectItem value="system">Mar</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default MonthSelect;
