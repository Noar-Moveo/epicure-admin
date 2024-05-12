// export interface IAddEntryFormProps {
//   fields: string[];
//   closeModal: () => void;
//   activeTable: string;
//   updateData: () => void;
// }

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
