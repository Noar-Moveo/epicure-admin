export interface IAddEntryFormProps {
  fields: string[];
  closeModal: () => void;
  activeTable: string;
  updateData: () => void;
}
