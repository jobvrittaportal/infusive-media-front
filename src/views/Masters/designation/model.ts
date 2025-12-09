export interface IDesignation {
    id?: number;
    designationName: string;
    status?: boolean;
};

export interface IDesignationTable {
    designations: IDesignation[];
    totalCount: number;
}

export const defaultDesignation: IDesignation = {
    designationName: '',
}

