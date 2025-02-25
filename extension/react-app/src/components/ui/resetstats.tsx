import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const ResetStatisticsButton = () => {
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    console.log("Statistics reset");
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full text-slate-200 bg-red-950 dark:bg-red-700 hover:bg-red-900 dark:hover:bg-red-600"
        >
          Reset Statistics
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm mx-auto p-6 bg-white dark:bg-gray-950 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently reset your statistics. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={handleReset}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetStatisticsButton;
