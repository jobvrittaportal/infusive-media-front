export interface ISource {
  id?: number;
  name: string;
 
}

export interface ISourceTable {
  sources: ISource[];
  totalCount: number;
}

export const defaultSource: ISource = {
  name: "",
  
};


