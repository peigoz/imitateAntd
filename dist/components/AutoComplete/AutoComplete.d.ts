import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/Input';
interface DateSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DateSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}
declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
