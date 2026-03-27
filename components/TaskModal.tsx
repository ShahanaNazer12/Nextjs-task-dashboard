"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { v4 as uuid } from "uuid";

export default function TaskModal({
  open,
  setOpen,
  onSave,
  editTask,
}: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("Todo");
  const [dueDate, setDueDate] = useState("");

  
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setStatus(editTask.status);
      setDueDate(editTask.dueDate);
    } else {
      setTitle("");
      setDescription("");
      setStatus("Todo");
      setDueDate("");
    }
  }, [editTask]);

 
  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!dueDate) {
      alert("Please select due date");
      return;
    }

    const newTask: Task = {
      id: editTask ? editTask.id : uuid(),
      title,
      description,
      status,
      dueDate,
    };

    onSave(newTask);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="space-y-4">

        
        <DialogHeader>
          <DialogTitle>
            {editTask ? "Edit Task" : "Add Task"}
          </DialogTitle>
        </DialogHeader>

       
        <Input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

       
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

       
        <select
          className="border p-2 w-full rounded"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as Task["status"])
          }
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        
        <Button onClick={handleSubmit}>
          {editTask ? "Update Task" : "Save Task"}
        </Button>

      </DialogContent>
    </Dialog>
  );
}