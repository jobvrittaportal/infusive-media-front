export interface ICity {
  id?: number;
  name: string;
  countryId?: number
  countryName?: string
  stateId?: number
  stateName?: string


};

export interface ICityTable {
  cities: ICity[];
  totalCount: number;
}

export const defaultCity: ICity = {
  name: '',
}
export interface ICountryOption {
  id: number;
  name: string;
}
export interface IStateOption {
  id: number;
  name: string;
}


