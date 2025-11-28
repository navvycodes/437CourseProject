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
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Phone Usage Alert!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          GET OFF YOUR PHONE!!!!!!!!!!
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
