
export interface IPOC {
  id?: number;
  companyName: string;
  industryTypeID: number;
  industryTypeName?: string;
  phoneCountryCode: string;
  companyPhone: string;
  companyEmail: string;
  websiteUrl: string;
  postalZipCode: string;
  feid: string;
  status: boolean;
  countryId: number;
  countryName?: string;
  stateId: number;
  cityId: number;
}

export interface IPocInfo {
  company: IPOC[];
  totalCount: number;
}

// 🔹 POC LIST ITEM (POC Page)
export interface IPoc {
  id?: number;
  name: string;
  companyId: number;
  companyName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  whatsapp: string;
  designationId: number;
  designationName: string;
  linkedinUrl?: string;
  status?: boolean;
}

// 🔹 POC LIST RESPONSE (same as ICompanyInfo pattern)
export interface IPocInfo {
  pocs: IPoc[];
  totalCount: number;
}

// 🔹 DEFAULT POC (for Add / Edit drawer)
export const defaultPoc: IPoc = {
  name: '',
  companyId: 0,
  companyName: '',
  email: '',
  phoneCountryCode: '',
  phoneNumber: '',
  whatsapp: '',
  designationId: 0,
  designationName: '',
};
