import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const PhoneAlertDialog = ({ open }: { open: boolean }) => {
  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#d32f2f",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          animation: "flasher .5s linear infinite",
          "@keyframes flasher": {
            "0%, 100%": { backgroundColor: "#d32f2f", color: "#fff" },
            "50%": { backgroundColor: "#fff", color: "#d32f2f" },
          },
        },
      }}
    >
      <DialogTitle sx={{ color: "inherit" }}>
        {"Phone Usage Alert!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ color: "inherit" }}
        >
          GET OFF YOUR PHONE!!!!!!!!!!
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
