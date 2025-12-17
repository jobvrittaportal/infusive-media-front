import * as yup from 'yup';

export interface ILead{
    leadId?: number;
    pocId: number[];
    companyId: number;
    sourceId: number;
    statusId: number;
    assignedToUserId: number;

    companyName?: string,
    pocName?: string,
    sourceName?: string,
    statusName?: string,
    assignedToUserName?: string,
};

export interface ILeadTable {
    leads: ILead[];
    totalCount: number;
};

export const defaultLead = {
    pocId: [],
    companyId: 0,
    sourceId: 0,
    statusId: 0,
    assignedToUserId: 0,
} satisfies ILead;

export const LeadSchema = yup.object({
    pocId : yup.array().min(1,"Select at least one POC").required(),
    sourceId : yup.number().typeError("Source is required").required("Source is required"),
    statusId : yup.number().typeError("Status is required").required("Status is required"),
    assignedToUserId : yup.number().typeError("User is required").required("User is required"),
});

export const cards = [
  { label: "Total Leads", value: 12, percent: "+2%" },
  { label: "Active Leads", value: 7, percent: "+12%" },
  { label: "New Leads", value: 5, percent: "+10%" },
  { label: "Closed Leads", value: 20, percent: "+11%" },
];

