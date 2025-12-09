export interface ICompany {
  companyName: string;
  industryTypeID: number;
  industryTypeName?: string;
  phoneCountryCode: string;
  companyPhone: string;    
  companyEmail: string;
  websiteUrl: string;
  countryCode: string;       
  feidOrGst: string;
  companyAddress: string;   
}
export interface IIndustryTypeOption {
  id: number;
  name: string;
}


export const defaultCompany: ICompany = {
  companyName: '',
  industryTypeID: 0,
  industryTypeName:'',
  phoneCountryCode: '',
  companyPhone: '',
  companyEmail: '',
  websiteUrl: '',
  countryCode: '',
  feidOrGst: '',
  companyAddress: '',
};


export interface ICompanyInfo {
  company: ICompany[];
  totalCount: number;
}

