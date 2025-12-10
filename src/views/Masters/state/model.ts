export interface IState {
    id?: number;
    name: string;
    countryId: number;

};

export interface IStateTable {
    states: IState[];
    totalCount: number;
}

export const defaultState: IState = {
    name: '',
    countryId: 0,
}
export interface ICountryOption {
    id: number;
    name: string;
}

