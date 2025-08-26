import { Dialog, DialogOverlay, DialogContent } from '@radix-ui/react-dialog';


export const DialogBox = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/30" />
      <DialogContent className="mx-auto mt-32 max-w-md rounded-lg bg-background p-6 shadow-lg">
        {children}
      </DialogContent>
    </Dialog>
  );
};

