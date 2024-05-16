import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  OutlinedInput,
  Typography,
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
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fetchImagesFromS3Folder } from "../../../aws/s3config";

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
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [starsImages, setStarsImages] = useState<
    { label: string; value: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

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

    const fetchStarsImages = async () => {
      const images = await fetchImagesFromS3Folder("epicurephotos", "stars/");
      setStarsImages(
        images.map((image) => ({
          label: image.split("/").pop(),
          value: `https://epicurephotos.s3.eu-north-1.amazonaws.com/${image}`,
        }))
      );
    };

    if (fields.includes("stars")) {
      fetchStarsImages();
    }
  }, [fields]);

  const handleChange =
    (field: string) => (event: React.ChangeEvent<{ value: unknown }>) => {
      let value = event.target.value;
      if (field === "restaurants" || field === "dishes") {
        value = typeof value === "string" ? value.split(",") : value;
        value = Array.isArray(value)
          ? value.map(
              (val) =>
                options[field].find((option) => option.label === val)?.value
            )
          : value;
      } else if (field === "ingredients") {
        value = event.target.value ? [event.target.value] : [""];
      } else {
        value =
          options[field]?.find((option) => option.label === value)?.value ||
          value;
      }
      setFormData({ ...formData, [field]: value });
    };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      setIsUploading(true);
      const s3Client = new S3Client({
        region: "eu-north-1",
        credentials: {
          accessKeyId: "AKIAZQ3DTA4XWDI3NJMX",
          secretAccessKey: "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",
        },
      });

      const params = {
        Bucket: "epicurephotos",
        Key: `Images/${selectedFile.name}`,
        Body: selectedFile,
        ContentType: selectedFile.type,
      };

      try {
        await s3Client.send(new PutObjectCommand(params));
        const uploadedImageUrl = `https://epicurephotos.s3.eu-north-1.amazonaws.com/Images/${selectedFile.name}`;
        setImageUrl(uploadedImageUrl);
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: uploadedImageUrl,
        }));
      } catch (err) {
        console.error("Error uploading image:", err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleFormSubmit = async () => {
    if (file && !imageUrl) {
      console.error("Image upload failed or is not yet completed.");
      return;
    }

    try {
      if (handleSubmit) {
        await handleSubmit(formData);
      } else {
        await postData(activeTable, formData, BASE_URL);
        closeModal();
        updateData();
        setFormData({});
        setError(null);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding entry:", error.message);
        setError(error.message || resources.ErrorAdd);
      } else {
        setError(resources.ErrorAdd);
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
            const selectedValues = formData[field]
              ? (Array.isArray(formData[field])
                  ? formData[field]
                  : [formData[field]]
                ).map(
                  (id: string) =>
                    options[field].find((option) => option.value === id)
                      ?.label || id
                )
              : [];
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
                  value={selectedValues}
                  onChange={handleChange(field)}
                  renderValue={(selected) =>
                    Array.isArray(selected) ? selected.join(", ") : selected
                  }
                  input={<OutlinedInput label={label} />}
                >
                  {options[field].map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          } else if (field === "stars") {
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
                  {starsImages.map((image) => (
                    <MenuItem key={image.value} value={image.value}>
                      {image.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          } else if (field === "image") {
            return (
              <div key={field}>
                <InputLabel>{label}</InputLabel>
                <input type="file" onChange={handleFileChange} />
                {isUploading && <p>Uploading...</p>}
                {imageUrl && (
                  <div>
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      style={{ marginTop: "10px", maxWidth: "100px" }}
                    />
                  </div>
                )}
              </div>
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
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        <Button type="submit" disabled={isUploading}>
          {resources.Save}
        </Button>
      </form>
    </Container>
  );
}

export default AddEntryForm;
