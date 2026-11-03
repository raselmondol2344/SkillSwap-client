
"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  TextArea,
  Description,
  Form,
} from "@heroui/react";

import { useState } from "react";
import { toast } from "react-toastify";

export function EditTaskModal({ task, onUpdate }) {
  const {
    _id,
    title,
    category,
    budget,
    deadline,
    details,
  } = task;

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedTask = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      const res = await fetch(`http://localhost:8000/task/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await res.json();

      
      if (res.ok && data.matchedCount > 0) {
        onUpdate({
          ...task,
          ...updatedTask,
        });

        setIsOpen(false);
        toast.success("Task updated successfully");
      } else {
        toast.error("Task update failed");
      }
    } catch (error) {
      //console.error(error);
      toast.warning("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        size="sm"
        onPress={() => setIsOpen(true)}
        className="h-9 flex-1 cursor-pointer rounded-lg border border-blue-300 bg-white px-3 text-blue-600 hover:bg-blue-50 sm:flex-none"
      >
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Edit Task</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-4 sm:p-6">
              <Surface variant="default">
                <Form
                  onSubmit={onSubmit}
                  className="w-full px-2 py-2 sm:px-4 sm:py-4"
                >
                  {/* Task Title */}
                  <TextField
                    isRequired
                    name="title"
                    defaultValue={title}
                  >
                    <Label className="text-xs font-medium text-blue-800 sm:text-sm">
                      Task Title
                    </Label>

                    <Input
                      placeholder="Enter task title"
                      className="mt-1 rounded-xl border border-blue-200 bg-blue-50/40"
                    />

                    <FieldError />
                  </TextField>

                  {/* Category and Budget */}
                  <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="w-full">
                      <Label
                        htmlFor="category"
                        className="mb-1 block text-xs font-medium text-blue-800 sm:text-sm"
                      >
                        Category
                      </Label>

                      <select
                        id="category"
                        name="category"
                        required
                        defaultValue={category}
                        className="h-10 w-full rounded-xl border border-blue-200 bg-blue-50/40 px-3 text-xs text-gray-700 outline-none transition focus:border-blue-600 focus:bg-white sm:text-sm"
                      >
                        <option value="" disabled>
                          Select Category
                        </option>

                        <option value="programming">
                          Programming
                        </option>

                        <option value="web development">
                          Web Development
                        </option>

                        <option value="data science">
                          Data Science
                        </option>

                        <option value="machine learning">
                          Machine Learning
                        </option>
                      </select>
                    </div>

                    <TextField
                      isRequired
                      name="budget"
                      type="number"
                      defaultValue={budget}
                    >
                      <Label className="text-xs font-medium text-blue-800 sm:text-sm">
                        Budget
                      </Label>

                      <Input
                        placeholder="Enter your budget"
                        className="mt-1 rounded-xl border border-blue-200 bg-blue-50/40"
                      />

                      <FieldError />
                    </TextField>
                  </div>

                  {/* Deadline */}
                  <div className="mt-4 w-full">
                    <TextField
                      isRequired
                      name="deadline"
                      defaultValue={deadline}
                    >
                      <Label className="text-xs font-medium text-blue-800 sm:text-sm">
                        Deadline
                      </Label>

                      <Input
                        type="date"
                        className="mt-1 rounded-xl border border-blue-200 bg-blue-50/40"
                      />

                      <FieldError />
                    </TextField>
                  </div>

                  {/* Details */}
                  <div className="mt-4 w-full">
                    <TextField
                      isRequired
                      name="details"
                      defaultValue={details}
                    >
                      <Label className="text-xs font-medium text-blue-800 sm:text-sm">
                        Task Details
                      </Label>

                      <TextArea
                        placeholder="Write task details"
                        className="mt-1 min-h-20 rounded-xl border border-blue-200 bg-blue-50/40 sm:min-h-24"
                      />

                      <Description className="text-[11px] text-blue-600">
                        Describe your task requirements.
                      </Description>

                      <FieldError />
                    </TextField>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex w-full justify-end gap-3 border-t border-blue-100 pt-4">
                    <Button
                      type="button"
                      slot="close"
                      variant="secondary"
                      isDisabled={loading}
                      className="border border-gray-200 bg-white px-5 font-medium text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      isDisabled={loading}
                      className="bg-blue-600 px-7 font-semibold text-white shadow-sm hover:bg-blue-700"
                    >
                      {loading ? "Updating..." : "Update Task"}
                    </Button>
                  </div>
                </Form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
