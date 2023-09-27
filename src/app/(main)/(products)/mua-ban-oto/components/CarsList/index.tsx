import './index.css';

import { Car, DisplayCarType } from "../../type"
import Column from "./Column";
import Grid from "./Grid";
import Table from "./Table";

interface Props {
    cars: Car[],
    displayType: DisplayCarType
}
export default function CarList({ cars, displayType }: Props) {
    return (
        <div className="car-list-container">
            <div className="car-list-content">
                {displayType === 'GRID' && (
                    <Grid cars={cars} />
                )}
                {displayType === 'COLUMN' && (
                    <Column cars={cars} />
                )}
                {displayType === 'TABLE' && (
                    <Table cars={cars} />
                )}
            </div>
        </div>
    );
}