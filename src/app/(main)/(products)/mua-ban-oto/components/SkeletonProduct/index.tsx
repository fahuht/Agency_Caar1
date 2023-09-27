import './index.css';

import Column from "./Column";
import Grid from "./Grid";
import Table from "./Table";

interface Props {
    displayType: string
}
export default function SkeletonProduct({ displayType }: Props) {
    return (
        <div className="car-list-container">
            <div className="car-list-content">
                {displayType === 'GRID' && (
                    <Grid />
                )}
                {displayType === 'COLUMN' && (
                    <Column />
                )}
                {displayType === 'TABLE' && (
                    <Table />
                )}
            </div>
        </div>
    );
}