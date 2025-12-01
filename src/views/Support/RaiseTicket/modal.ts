import * as yup from "yup";

export interface ISupportForm {
    application_Id: number,
    priority: string,
    impact: string,
    assign_group_Id: number,
    subject: string,
    desc: string,
}


export const schema = yup.object().shape({
    application_Id: yup.number().required("Application required").typeError("Application required"),
    priority: yup.string().required("Priority required").typeError("Priority required"),
    impact: yup.string().required("Impact required").typeError("Impact required"),
    assign_group_Id: yup.number().required("Assign group required").typeError("Assign group required"),
    subject: yup.string().required("Subject required"),
    desc: yup.string().required("Description required"),
});

export const priorityOptions = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Critical", value: "Critical" },
]

export const impactOptions = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" }
]

export const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
        case "critical": return "red";
        case "high": return "orange";
        case "medium": return "yellow";
        case "low": return "green";
        default: return "gray";
    }
};

export const getImpactColor = (impact: string) => {
    switch (impact?.toLowerCase()) {
        case "high": return "red";
        case "medium": return "orange";
        case "low": return "green";
        default: return "gray";
    }
};

export const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
        case "open": return "purple";
        case "assigned": return "blue";
        case "in progress": return "orange";
        case "resolved": return "green";
        case "closed": return "gray";
        default: return "gray";
    }
};