export interface IStatus {
  id?: number;
  statusName: string;
  status?: boolean;
}

export interface IStateTable {
  status: IStatus[];
  totalCount: number;
}

export const defaultStatus: IStatus = {
  statusName: "",
};
