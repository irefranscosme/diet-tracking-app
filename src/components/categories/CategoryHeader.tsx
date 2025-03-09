import Scanner from '../scanner/Scanner';

const CategoryHeader = () => {
    return (
        <div className="mb-4 flex items-center justify-between">
            <h1 className="uppercase font-normal text-lg">
                Calories for the day:{' '}
                <span className="font-bold">1,200 kcal</span>
            </h1>
            <div>
                <Scanner />
            </div>
        </div>
    );
};

export default CategoryHeader;
