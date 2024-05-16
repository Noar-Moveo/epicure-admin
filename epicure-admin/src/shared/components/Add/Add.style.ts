import { styled } from "@mui/system";
import colors from "../../../data/colors";

export const Container = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: colors.white,
  padding: 20,
});

export const CloseButton = styled("div")({
  position: "absolute",
  top: 5,
  right: 5,
});
