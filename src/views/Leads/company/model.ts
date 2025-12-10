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
  IndustryId: number;
  IndustryName: string;
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

export const countryPhoneOptions = [
  {
    code: '+1',
    country: 'United States',
    iso2: 'us',
    flagUrl: 'https://flagcdn.com/us.svg',
  },
  {
    code: '+91',
    country: 'India',
    iso2: 'in',
    flagUrl: 'https://flagcdn.com/in.svg',
  },
  {
    code: '+44',
    country: 'United Kingdom',
    iso2: 'gb',
    flagUrl: 'https://flagcdn.com/gb.svg',
  },
  {
    code: '+61',
    country: 'Australia',
    iso2: 'au',
    flagUrl: 'https://flagcdn.com/au.svg',
  },
];