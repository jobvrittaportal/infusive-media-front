export interface ICountry {
    id?: number;
    name: string;
    code: string;
    dialCode: string;
    flagUrl?: string;
};

export interface ICountryTable {
    countries: ICountry[];
    totalCount: number;
}

export const defaultCountry: ICountry = {
    name: '',
    code: '',
    dialCode: '',
    flagUrl: '',
}

