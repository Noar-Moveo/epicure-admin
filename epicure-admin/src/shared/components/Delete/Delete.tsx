import React from "react";
import { Modal, Button, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IDeleteProps } from "./Delete.type";
import resources from "../../../resources/resources.json";
import deleteStyle from "./Delete.style";
import useModal from "../../hooks/useModal";

const Delete: React.FC<IDeleteProps> = ({ item, deleteDataCallback }) => {
  const { showModal, openModal, closeModal } = useModal();

  const handleConfirm = async () => {
    await deleteDataCallback(item._id);
    closeModal();
  };

  return (
    <>
      <DeleteIcon onClick={openModal} style={deleteStyle.deleteIcon} />
      <Modal open={showModal} onClose={closeModal}>
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
          <Button onClick={closeModal}>{resources.No}</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Delete;
