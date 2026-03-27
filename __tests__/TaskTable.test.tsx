import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskTable from "@/components/TaskTable";

describe("TaskTable", () => {
  it("renders task title correctly", () => {
    const tasks = [
      {
        id: "1",
        title: "Test Task",
        description: "Testing",
        status: "Todo",
        dueDate: "2026-01-01",
      },
    ];

    render(
      <TaskTable
        tasks={tasks}
        onDelete={() => {}}
        onEdit={() => {}}
        onStatusChange={() => {}}
      />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });
});