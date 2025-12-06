import { createContext, useContext, useMemo, useState } from "react";

export interface IPageFeature extends IPagePermission {   // used for page with its features
    features: IPagePermission[];
}

export interface IPagePermission {        // used for a single page 
    id: number,
    name: string,
    label?: string,
    url?: string,
    description?: string,
    isFeature: boolean,
    parentId?: number,
    parent?: string,
    permission: boolean
}

export interface ILogin {
    userId: number,
    userName: string,
    avatarUrl?: string,
    token: string,
    permissions: Array<IPagePermission>
}

interface AuthContextType {
    loggedin: boolean,
    userId: number | null,
    login: (data: ILogin) => void,
    logout: () => void,
    userName: string,
    avatarUrl: string | null,
    loginObj: ILogin | null;
    pageFeatures: IPageFeature[],
    hasPermission: (pageName: string, featureName?: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loginObj, setLoginObj] = useState<ILogin | null>(() => {
        const auth = sessionStorage.getItem("loginData");
        return auth ? JSON.parse(auth) : null;
    });
    const loggedin = !!loginObj;

    const login = (data: ILogin) => {
        sessionStorage.setItem("loginData", JSON.stringify(data));
        setLoginObj(data);
    };

    const logout = () => {
        sessionStorage.removeItem("loginData");
        sessionStorage.removeItem("activePortal");
        setLoginObj(null);
    };

    const pageFeatures = useMemo(() => {
        if (!loginObj) return [];

        const features: IPageFeature[] = [];

        const parentPages = loginObj.permissions?.filter(p => !p.isFeature);

        parentPages?.forEach(pp => {
            const pageFeature: IPageFeature = {     // pageFeature with IPagePermission(parent page) + empty features[](feature of parent page)
                ...pp,
                features: []
            };

            loginObj.permissions?.forEach(p => {
                if (pp.id === p.parentId) {
                    pageFeature.features.push(p);   // pageFeature with IPagePermission(parent page) + features[](features of parent page)
                }
            });

            features.push(pageFeature);            // pageFeature with IPagePermission + features[IPagePermission]
        });

        return features;
    }, [loginObj]);

    const hasPermission = (pageName: string, featureName?: string): boolean => {
        const page = pageFeatures.find(page => page.name === pageName);   // get the page with IPagePermission + features[IPagePermission]
        if (!page) return false;
        if (!featureName) {                  // used to check page permission only, when featureNameis not provided
            return page.permission;          // return page permission (true/false)
        }
        return page.features.some(f => f.name === featureName && f.permission);       // check feature permission under the page
    };

    const userName = loginObj?.userName ?? '';
    const userId = loginObj?.userId ?? null;
    const avatarUrl = loginObj?.avatarUrl ?? null;

    return (
        <AuthContext.Provider value={{ userId, avatarUrl, loggedin, login, logout, userName, loginObj, pageFeatures, hasPermission }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
