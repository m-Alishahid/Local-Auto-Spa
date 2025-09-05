import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check } from "lucide-react";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  details?: React.ReactNode; // Optional: services, add-ons, total
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  title,
  description,
  details,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-lg p-6 mx-auto rounded-xl shadow-lg hover:gray-50">
        <AlertDialogHeader className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black-100 mb-4 hover:bg-gray-50">
            <Check className="h-10 w-10 text-black-600 " />
          </div>

          <AlertDialogTitle className="text-2xl font-bold">{title}</AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-gray-700">{description}</AlertDialogDescription>

          {details && (
            <div className="mt-4 border-t border-gray-200 pt-4 space-y-3 text-gray-700 text-left">
              {details}
            </div>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-center mt-6">
          <AlertDialogAction
            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium"
            onClick={onClose}
          >
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
