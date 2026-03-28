"use client";

import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";

export default function TaskTable({
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
}: any) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Title</th>
          <th className="p-2 border">Description</th>
          <th className="p-2 border">Due Date</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center p-4">
              No tasks available
            </td>
          </tr>
        ) : (
          tasks.map((task: Task) => (
            <tr key={task.id} className="text-center">


              <td className="border p-2">{task.title}</td>


              <td className="border p-2">
                {task.description || "-"}
              </td>


              <td className="border p-2">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "-"}
              </td>


              <td className="border p-2">
                <select
                  value={task.status}
                  onChange={(e) =>
                    onStatusChange(
                      task.id,
                      e.target.value as Task["status"]
                    )
                  }
                  className="border rounded p-1"
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>


              <td className="border p-2 space-x-2">
                <Button onClick={() => onEdit(task)}>Edit</Button>
                <Button
                  variant="destructive"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </Button>
              </td>

            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}