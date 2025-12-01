import { IPage } from "../pages/model";

export interface IRoleForm {
  id?: number,
  name: string,
  description?: string,
  permissions?: IPage[]
}