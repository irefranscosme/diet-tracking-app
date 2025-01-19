import React from 'react';
import {
    SelectItem,
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { getYear } from 'date-fns';

const YearSelect = () => {
    const currentYear = getYear(new Date());
    return (
        <Select>
            <SelectTrigger className="w-[85px]">
                <SelectValue placeholder="Year" defaultValue={currentYear} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">{currentYear}</SelectItem>
                <SelectItem value="system">{currentYear - 1}</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default YearSelect;
