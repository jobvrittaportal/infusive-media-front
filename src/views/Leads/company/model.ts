import * as yup from 'yup';

export interface ICompany {
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

export interface ICompanyPOC {
  name: string;
  companyId: number;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  whatsapp: string;
  designationId: number;
  linkedinUrl?: string;
}

export interface IIndustryTypeOption {
  IndustryId: number;
  IndustryName: string;
}

export interface IDesignationDropDown {
  designationId: number;
  designationName: string;
}

export interface ILeadGenerate {
  id?: number;
  userId: number;
  sourceId: number;
  statusId: number;
};

export const defaultLeadGenerate: ILeadGenerate = {
  userId: 0,
  sourceId: 0,
  statusId: 0,
};

export const LeadSchema = yup.object({
  userId: yup.number().typeError('User is required').min(1, 'User is required').required(),
  sourceId: yup.number().typeError('Source is required').min(1, 'Source is required').required(),
  statusId: yup.number().typeError('Status is required').min(1, 'Status is required').required(),
});
 
export const defaultCompany: ICompany = {
  companyName: '',
  industryTypeID: 0,
  industryTypeName: '',
  phoneCountryCode: '',
  companyPhone: '',
  companyEmail: '',
  websiteUrl: '',
  feid: '',
  postalZipCode: '',
  status: true,
  countryId: 0,
  stateId: 0,
  cityId: 0,
};

export const defaultCompanyPOC: ICompanyPOC = {
  name: '',
  companyId: 0,
  email: '',
  phoneCountryCode: '',
  phoneNumber: '',
  designationId: 0,
  whatsapp: '',
}
export interface ICompanyInfo {
  company: ICompany[];
  totalCount: number;
}

export const cards = [
  { label: "Total Companies", value: 128, percent: "+2%" },
  { label: "Active Companies", value: 250, percent: "+12%" },
  { label: "New Companies", value: 250, percent: "+10%" },
  { label: "Top Companies", value: 472, percent: "+11%" },
];