export interface IRole {
    id: number,
    name: string,
    description?: string
}
export const head = [
  { id: 1, header: "S. No" },
  { id: 2, header: "Role Name" },
  { id: 3, header: "Role Description" },
  { id: 4, header: "Edit Permission" },
  { id: 5, header: "Action" }
];

export interface IData {
  roles: IRole[];
  count: number;
}