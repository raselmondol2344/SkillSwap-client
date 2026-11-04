
"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { rejectProposal } from "@/lib/action";

export function RejectProposalAlert({
  taskId,
  freelancerId,
  onReject,
}) {
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    try {
      setLoading(true);

      const data = await rejectProposal(taskId, freelancerId);

      if (data.modifiedCount > 0) {
        onReject(taskId, freelancerId);
      } else {
        alert("Proposal not found or already rejected");
      }
    } catch (error) {
      console.error(error);
      alert("Proposal rejection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <Button
        size="sm"
        className="h-9 flex-1 cursor-pointer border border-red-300 bg-white px-3 text-red-500 sm:flex-none"
      >
        Reject
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>
                Do you want to reject this proposal?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              Are you sure you want to reject this freelancers proposal?
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                onClick={handleReject}
                slot="close"
                variant="danger"
                isDisabled={loading}
              >
                {loading ? "Rejecting..." : "Confirm"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
