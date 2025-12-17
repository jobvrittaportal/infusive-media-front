export interface ISource {
  id?: number;
  SourceName: string;
  status?: boolean;
 
}
 
export interface ISourceTable {
  source: ISource[];
  totalCount: number;
}
 
export const defaultSource: ISource = {
  SourceName: "",
 
};