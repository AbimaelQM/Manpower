import { DataSetItem } from "./data-set-item";

export interface DataSet {
    labels:Array<string>,
    datasets:Array<DataSetItem>
}
