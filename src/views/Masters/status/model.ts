export interface IStatus {
  id?: number;
  name: string;
}

export interface IStateTable {
  states: IStatus[];
  totalCount: number;
}

export const defaultStatus: IStatus = {
  name: "",
};
