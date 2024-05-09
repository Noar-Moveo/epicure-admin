import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { postData } from "../../../services/post";
import { BASE_URL } from "../../constants/constants";
import { Container, CloseButton } from "./Add.style";
import { IAddEntryFormProps } from "./Add.type";
import { capitalizeFirstLetter } from "../../../data/utils/CapitalizeFirstLetter";
import resources from "../../../resources/resources.json";

function AddEntryForm({
  fields,
  closeModal,
  activeTable,
  updateData,
}: IAddEntryFormProps) {
  const [formData, setFormData] = useState<{
    [key: string]: string | string[];
  }>({});

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let value: string | string[] = event.target.value;
      if (field === "ingredients" || field === "restaurants") {
        value = event.target.value ? [event.target.value] : [""];
      }
      setFormData({ ...formData, [field]: value });
    };

  const handleSubmit = async () => {
    try {
      await postData(activeTable, formData, BASE_URL);
      closeModal();
      updateData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <Container>
      <CloseButton onClick={handleClose}>
        <CloseIcon />
      </CloseButton>
      <form>
        {fields.map((field) => (
          <TextField
            key={field}
            label={capitalizeFirstLetter(field)}
            value={formData[field] || ""}
            onChange={handleChange(field)}
            margin="normal"
            fullWidth
          />
        ))}
        <Button onClick={handleSubmit}>{resources.Save}</Button>
      </form>
    </Container>
  );
}

export default AddEntryForm;
