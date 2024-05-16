import colors from "../../../data/colors";

export const tableCellStyle = {
  color: colors.black,
};

export const tableStyle = {
  minWidth: 300,
  width: "100%",
};

export const statusIndicatorStyle = (backgroundColor: string) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  marginRight: "5px",
  backgroundColor,
});

export const imageStyle = {
  width: "50px",
  height: "50px",
};

export const starsStyle = {
  width: "50px",
  height: "20px",
};

export const flexContainerStyle = {
  display: "flex",
  alignItems: "center",
};
export const buttonContainerStyle = {
  marginBottom: "16px",
  display: "flex",
  gap: "8px",
};
