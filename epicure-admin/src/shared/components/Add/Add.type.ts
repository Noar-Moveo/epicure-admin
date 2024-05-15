
export type FormDataType = {
  [key: string]: any;
};

export interface IAddEntryFormProps {
  fields: string[];
  closeModal: () => void;
  activeTable: string;
  updateData: () => void;
  formData?: FormDataType;
  handleSubmit?: (formData: FormDataType) => Promise<void>;
}

export const ENUMS: {
  [key: string]: string[];
} = {
  status: ["Active", "Deprecated"],
};

export interface IOption {
  label: string;
  value: string;
}