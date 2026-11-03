"use client";

import { AlertDialog, Button } from "@heroui/react";

export function DeleteTaskAlert({ task, onDelete }) {
  const { _id, title } = task;

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/task/${_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok && data.deletedCount > 0) {
        onDelete(_id);
      } else {
        console.log(data);
        alert("Task delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <Button
        size="sm"
        className="h-9 flex-1 cursor-pointer border border-red-300 bg-white px-3 text-red-500 sm:flex-none"
      >
        Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>
                Do you want to permanently delete the task?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                <strong>{title}</strong> Click the Confirm button to permanently delete all its data.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                onClick={handleDelete}
                slot="close"
                variant="danger"
              >
                Confirm
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}