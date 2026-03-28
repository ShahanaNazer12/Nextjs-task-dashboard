"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTasks, saveTasks } from "@/lib/storage";
import { Task } from "@/types/task";
import TaskTable from "@/components/TaskTable";
import TaskModal from "@/components/TaskModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTheme } from "next-themes";

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [user, setUser] = useState<string | null>(null);


  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");


  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;


  const { theme, setTheme } = useTheme();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(storedUser);
      setTasks(getTasks());
    }
  }, [router]);


  const handleSave = (task: Task) => {
    let updatedTasks: Task[];

    if (editTask) {
      updatedTasks = tasks.map((t) =>
        t.id === task.id ? task : t
      );
      setEditTask(null);
    } else {
      updatedTasks = [...tasks, task];
    }

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };


  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };


  const handleEdit = (task: Task) => {
    setEditTask(task);
    setOpen(true);
  };


  const changeStatus = (id: string, status: Task["status"]) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, status } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };


  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };


  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || task.status === filterStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();

      return sortOrder === "asc"
        ? dateA - dateB
        : dateB - dateA;
    });


  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <div className="p-6">


      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {user && (
            <p className="text-sm text-gray-500">
              Welcome, {user}
            </p>
          )}
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            className="w-full sm:w-auto"
            onClick={() => setOpen(true)}
          >
            + Add Task
          </Button>


          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            Toggle Theme
          </Button>

          <Button
            className="w-full sm:w-auto"
            variant="destructive"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>


      <div className="flex flex-col sm:flex-row gap-4 mb-6">

        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-xs"
        />

        <Select
          value={filterStatus}
          onValueChange={(value) => setFilterStatus(value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Todo">Todo</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Due Date ↑</SelectItem>
            <SelectItem value="desc">Due Date ↓</SelectItem>
          </SelectContent>
        </Select>

      </div>


      <TaskTable
        tasks={currentTasks}
        onDelete={deleteTask}
        onEdit={handleEdit}
        onStatusChange={changeStatus}
      />


      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </Button>

        <span className="text-sm">
          Page {currentPage} of {totalPages || 1}
        </span>

        <Button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>


      <TaskModal
        open={open}
        setOpen={setOpen}
        onSave={handleSave}
        editTask={editTask}
      />
    </div>
  );
}