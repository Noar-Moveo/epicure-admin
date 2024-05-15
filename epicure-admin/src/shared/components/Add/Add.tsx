import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  OutlinedInput,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { postData } from "../../../services/post";
import { BASE_URL } from "../../constants/constants";
import { Container, CloseButton } from "./Add.style";
import { IAddEntryFormProps } from "./Add.type";
import { capitalizeFirstLetter } from "../../../data/utils/CapitalizeFirstLetter";
import resources from "../../../resources/resources.json";
import { ENUMS } from "./Add.type";
import { fetchData } from "../../../services/fetchData";
import { fetchImagesFromS3 } from "../../../aws/s3config";

function AddEntryForm({
  fields,
  closeModal,
  activeTable,
  updateData,
  formData: initialFormData = {},
  handleSubmit,
}: IAddEntryFormProps) {
  const [formData, setFormData] = useState<{
    [key: string]: string | string[];
  }>(initialFormData);
  const [options, setOptions] = useState<{ [key: string]: any[] }>({});
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const dropdownFields = ["chef", "restaurants", "dishes", "restaurant"];
    dropdownFields.forEach((field) => {
      if (fields.includes(field)) {
        fetchData(
          field,
          (data: any[]) => {
            const activeData = data.filter((item) => item.status === "Active");
            setOptions((prev) => ({
              ...prev,
              [field]: activeData.map((item) => ({
                label: item.name,
                value: item._id,
              })),
            }));
          },
          BASE_URL
        );
      }
    });
    fetchImagesFromS3("epicurephotos").then((imageKeys) => {
      const imageUrls = imageKeys.map((key) => ({
        label: key,
        value: `https://epicurephotos.s3.eu-north-1.amazonaws.com/${key}`,
      }));
      setImages(imageUrls);
    });
  }, [fields]);

  const handleChange =
    (field: string) => (event: React.ChangeEvent<{ value: unknown }>) => {
      let value = event.target.value;
      if (field === "restaurants" || field === "dishes") {
        value = typeof value === "string" ? value.split(",") : value;
      } else if (field === "ingredients") {
        value = event.target.value ? [event.target.value] : [""];
      }
      setFormData({ ...formData, [field]: value });
    };

  const handleFormSubmit = async () => {
    if (handleSubmit) {
      await handleSubmit(formData);
    } else {
      try {
        await postData(activeTable, formData, BASE_URL);
        closeModal();
        updateData();
        setFormData({});
      } catch (error) {
        console.error("Error:", error);
      }
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
      >
        {fields.map((field) => {
          const label = capitalizeFirstLetter(field);
          if (ENUMS[field]) {
            return (
              <FormControl
                fullWidth
                key={field}
                margin="normal"
                variant="outlined"
              >
                <InputLabel>{label}</InputLabel>
                <Select
                  label={label}
                  value={formData[field] || ""}
                  onChange={handleChange(field)}
                >
                  {ENUMS[field].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          } else if (options[field]) {
            const isMultiple = field === "restaurants" || field === "dishes";
            return (
              <FormControl
                fullWidth
                key={field}
                margin="normal"
                variant="outlined"
              >
                <InputLabel>{label}</InputLabel>
                <Select
                  multiple={isMultiple}
                  value={formData[field] || (isMultiple ? [] : "")}
                  onChange={handleChange(field)}
                  renderValue={(selected) =>
                    Array.isArray(selected) ? selected.join(", ") : selected
                  }
                  input={<OutlinedInput label={label} />}
                >
                  {options[field].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          } else if (field === "image" || field === "stars") {
            return (
              <FormControl
                fullWidth
                key={field}
                margin="normal"
                variant="outlined"
              >
                <InputLabel>{label}</InputLabel>
                <Select
                  label={label}
                  value={formData[field] || ""}
                  onChange={handleChange(field)}
                >
                  {images.map((image) => (
                    <MenuItem key={image.value} value={image.value}>
                      {image.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          } else {
            return (
              <TextField
                key={field}
                label={label}
                value={formData[field] || ""}
                onChange={handleChange(field)}
                margin="normal"
                fullWidth
                variant="outlined"
                autoComplete="off"
              />
            );
          }
        })}
        <Button type="submit">{resources.Save}</Button>
      </form>
    </Container>
  );
}

export default AddEntryForm;
