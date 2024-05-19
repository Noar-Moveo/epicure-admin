import React from "react";
import { Modal, Button, Typography, Box } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import resources from "../../../resources/resources.json";
import restoreStyle from "./Restore.style";
import { IRestoreProps } from "./Restore.type";
import useModal from "../../hooks/useModal";

const Restore: React.FC<IRestoreProps> = ({ item, restoreDataCallback }) => {
  const { showModal, openModal, closeModal } = useModal();

  const handleConfirm = async () => {
    await restoreDataCallback(item._id);
    closeModal();
  };

  return (
    <>
      <RestoreIcon onClick={openModal} style={restoreStyle.restoreIcon} />
      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="restore-confirmation-title"
        aria-describedby="restore-confirmation-description"
      >
        <Box sx={restoreStyle.modalBox}>
          <Typography id="restore-confirmation-title" variant="h6">
            {resources.ConfirmRestore}
          </Typography>
          <Typography id="restore-confirmation-description" sx={{ mb: 2 }}>
            {resources.RestoreQuestion}
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

export default Restore;
