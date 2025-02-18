// src/components/TaskView.js
import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const TaskView = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    priority: "",
    state: true,
    startDate: "",
    endDate: "",
  });

  // Fetch tasks on component mount
  useEffect(() => {
    fetch("http://3.83.252.138/query/taskService")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Handle input changes for the new task form
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox change for the task state
  const handleCheckboxChange = (e:any) => {
    setNewTask((prev) => ({
      ...prev,
      state: e.checked,
    }));
  };

  // Submit new task
  const addTask = () => {
    fetch("http://54.159.219.159:10071/command/taskService", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (response.ok) {
          alert("Task created successfully");
          setShowAddTaskModal(false);
          setNewTask({
            name: "",
            description: "",
            priority: "",
            state: true,
            startDate: "",
            endDate: "",
          });
          // Refresh the task list
          fetch("http://3.83.252.138/query/taskService")
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error("Error fetching tasks:", error));
        } else {
          response.text().then((text) => alert("Error: " + text));
        }
      })
      .catch((error) => console.error("Error creating task:", error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Registered Tasks</h2>
      <Button
        label="Create Task"
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded shadow-md hover:bg-green-700"
        onClick={() => setShowAddTaskModal(true)}
      />
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks registered</p>
      ) : (
        <ul className="w-full max-w-lg bg-white p-4 shadow-md rounded-md">
          {tasks.map((task:any) => (
            <li
              key={task.id}
              className="p-3 border-b cursor-pointer hover:bg-blue-50 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{task.name}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-600">
                  Priority: {task.priority}
                </p>
                <p className="text-sm text-gray-600">
                  State: {task.state ? "Active" : "Inactive"}
                </p>
                <p className="text-sm text-gray-600">
                  Start Date: {task.startDate}
                </p>
                <p className="text-sm text-gray-600">End Date: {task.endDate}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for creating a new task */}
      <Dialog
        header="Create New Task"
        visible={showAddTaskModal}
        style={{ width: "400px", backgroundColor: "white" }}
        onHide={() => setShowAddTaskModal(false)}
      >
        <div className="p-4 bg-white">
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            value={newTask.name}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <input
            type="text"
            name="priority"
            placeholder="Priority"
            value={newTask.priority}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <div className="flex items-center mb-4">
            <label className="mr-2">State:</label>
            <input
              type="checkbox"
              name="state"
              checked={newTask.state}
              onChange={(e) => handleCheckboxChange(e)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
          <input
            type="date"
            name="startDate"
            value={newTask.startDate}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <input
            type="date"
            name="endDate"
            value={newTask.endDate}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <Button
            label="Create Task"
            className="mt-4 bg-green-600 text-white p-2 rounded"
            onClick={addTask}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default TaskView;