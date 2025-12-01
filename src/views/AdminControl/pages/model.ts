export interface IPage {
    id: number,
    name: string,
    label?: string,
    url?: string,
    description?: string,
    isFeature: boolean,
    parentId?: number,
    parent?: string,
    permission: boolean,
    features?: IFeature[]
}
export interface IFeature {
    id: number,
    name: string,
    label?: string,
    url?: string,
    description?: string,
    isFeature: boolean,
    parentId?: number,
    parent?: string,
    permission: boolean,
    state?: 'create' | 'update' | 'remove'
}
export const Header = [
    { id: 1, name: "S. No" },
    { id: 2, name: "Page Name" },
    { id: 3, name: "Label" },
    { id: 4, name: "Description" },
    { id: 5, name: "URL" },
    { id: 6, name: "Edit Permission" },
    { id: 7, name: "Action" }
];