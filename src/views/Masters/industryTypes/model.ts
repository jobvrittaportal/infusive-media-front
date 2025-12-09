export interface IIndustrtyType {
    id?: number;
    industryName: string;
    status?: boolean;
};

export interface IIndustryTable {
    indusrties: IIndustrtyType[];
    totalCount: number;
}

export const defaultIndustryType: IIndustrtyType = {
    industryName: '',
}

