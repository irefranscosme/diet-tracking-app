import Scanner from '../scanner/Scanner';
import Uploader from '../scanner/Uploader';

const CategoryHeader = () => {
    return (
        <div className="mb-4 flex items-center justify-between">
            <h1 className="uppercase font-normal text-lg">
                Calories for the day:{' '}
                <span className="font-bold">1,200 kcal</span>
            </h1>
            <div className="flex flex-row gap-2 items-center">
                <Scanner />
                <Uploader />
            </div>
        </div>
    );
};

export default CategoryHeader;
