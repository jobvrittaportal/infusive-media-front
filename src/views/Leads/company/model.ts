export interface ICompany {
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
  stateId: number;
  cityId: number;
}
export interface IIndustryTypeOption {
  IndustryId: number;
  IndustryName: string;
}
 
 
export const defaultCompany: ICompany = {
  companyName: '',
  industryTypeID: 0,
  industryTypeName: '',
  phoneCountryCode: '',
  companyPhone: '',
  companyEmail: '',
  websiteUrl: '',
  // countryCode: '',
  feid: '',
  postalZipCode: '',
  status: true,
  //companyAddress: '',
  countryId: 0,
  stateId: 0,
  cityId: 0,
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

export const cards = [
  { label: "Total Companies", value: 128, percent: "+2%" },
  { label: "Active Companies", value: 250, percent: "+12%" },
  { label: "New Companies", value: 250, percent: "+10%" },
  { label: "Top Companies", value: 472, percent: "+11%" },
];