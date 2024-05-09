import React, { useState } from "react";
import { Modal, Button, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IDeleteProps } from "./Delete.type";
import resources from "../../../resources/resources.json";
import deleteStyle from "./Delete.style";

const Delete: React.FC<IDeleteProps> = ({ item, deleteDataCallback }) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await deleteDataCallback(item._id);
    setOpen(false);
  };

  return (
    <>
      <DeleteIcon
        onClick={() => setOpen(true)}
        style={deleteStyle.deleteIcon}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <Box sx={deleteStyle.modalBox}>
          <Typography id="delete-confirmation-title" variant="h6">
            {resources.ConfirmDelete}{" "}
          </Typography>
          <Typography id="delete-confirmation-description" sx={{ mb: 2 }}>
            {resources.DeleteQuestion}{" "}
          </Typography>
          <Button onClick={handleConfirm} color="error">
            {resources.Yes}
          </Button>
          <Button onClick={() => setOpen(false)}>{resources.No}</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Delete;
