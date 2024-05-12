import { useEffect, useState } from "react";
import { IconButton, Modal, TableCell } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddEntryForm from "../Add/Add";
import { fetchItemData } from "../../../services/fetchItemData";
import { updateData } from "../../../services/put";
import { IEditProps, IDataMap } from "./Edit.type";
import { FormDataType } from "../Add/Add.type";
import { editStyle } from "./Edit.style";

function Edit({
  activeTable,
  itemId,
  BASE_URL,
  updateData: refreshData,
}: IEditProps) {
  const [formData, setFormData] = useState<FormDataType>({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadItemData = async () => {
      try {
        const data = await fetchItemData(activeTable, itemId, BASE_URL);
        const { _id, __v, ...filteredData } = data;
        const processedData: IDataMap = Object.keys(filteredData).reduce(
          (arr: IDataMap, key: string) => {
            const value = filteredData[key];
            if (value && typeof value === "object") {
              if (Array.isArray(value)) {
                arr[key] = value.map((item) =>
                  item && item._id ? item._id : item
                );
              } else if (value._id) {
                arr[key] = value._id;
              } else {
                arr[key] = value;
              }
            } else {
              arr[key] = value;
            }
            return arr;
          },
          {}
        );
        setFormData(processedData);
      } catch (error) {
        console.error("Error loading item data:", error);
      }
    };

    if (itemId) {
      loadItemData();
    }
  }, [activeTable, itemId, BASE_URL]);

  const handleUpdate = async (formData: FormDataType) => {
    console.log("Updating with formData:", formData);
    try {
      await updateData(activeTable, itemId, formData, BASE_URL);
      refreshData();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const fieldsToEdit = Object.keys(formData).filter(
    (field) => field !== "_id" && field !== "__v"
  );

  return (
    <>
      <TableCell>
        <IconButton onClick={() => setShowModal(true)}>
          <EditIcon style={editStyle.deleteIcon} />
        </IconButton>
      </TableCell>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <AddEntryForm
          fields={fieldsToEdit}
          formData={formData}
          closeModal={() => setShowModal(false)}
          activeTable={activeTable}
          updateData={refreshData}
          handleSubmit={handleUpdate}
        />
      </Modal>
    </>
  );
}

export default Edit;
