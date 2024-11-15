import { useState, useEffect } from "react";
const TodoContainer = () => {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const formData = {
    title: title,
    status: status === "false" ? false : true,
    description: description,
  };

  async function fetchTodoList() {
    try {
      const response = await fetch("http://localhost:7777/api/v1/todo", {
        method: "GET",
      });
      const result = await response.json();
      if (result?.status) {
        setTodo(result?.data?.data);
      } else {
        throw new Error("Error while fetching todos");
      }
    } catch (error) {
      console.log(error);
      setTodo([]);
    }
  }

  useEffect(() => {
    fetchTodoList();
  }, []);

  async function handleChangeStatus(id: number, status: boolean) {
    try {
      const response = await fetch("http://localhost:7777/api/v1/todo", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status: status,
        }),
      });
      const result = await response.json();
      console.log(result);
      if (result.status) {
        fetchTodoList();
        alert("successfully updated the status");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      const response = await fetch("http://localhost:7777/api/v1/todo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const result = await response.json();
      if (result.status) {
        fetchTodoList();
        alert("successfully deleted");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateTodo() {
    try {
      const response = await fetch("http://localhost:7777/api/v1/todo", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status) {
        fetchTodoList();
        alert("New todo created successfully");
        setTitle("");
        setStatus("");
        setDescription("");
      } else {
        throw new Error("Something went wrong while creating todo");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[96%] mx-auto my-10">
      <div className="border-2 border-slate-500 p-10 rounded-md flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <label htmlFor="title" className="text-slate-800 text-lg w-1/6">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your todo title"
            id="title"
            className="border-2 border-gray-600 outline-none rounded-md px-2 py-1 w-5/6"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="status" className="text-slate-800 text-lg w-1/6">
            Status
          </label>
          <input
            type="text"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Enter your todo status"
            className="border-2 border-gray-600 outline-none rounded-md px-2 py-1 w-5/6"
            id="status"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="description" className="text-slate-800 text-lg w-1/6">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your todo description"
            className="border-2 border-gray-600 outline-none rounded-md px-2 py-1 w-5/6"
            id="description"
          />
        </div>
        <div>
          <button
            onClick={handleCreateTodo}
            type="submit"
            className="text-gray-100 text-sm bg-slate-600 py-2 px-5 rounded-md"
          >
            Create Todo
          </button>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        {todo.length === 0 ? (
          <></>
        ) : (
          todo.map(
            (
              item: {
                id: number;
                title: string;
                description: string;
                status: boolean;
              },
              index: number
            ) => {
              return (
                <div
                  key={index}
                  className="border-2 border-slate-500 p-10 rounded-md flex flex-row justify-between  mt-3"
                >
                  <div>
                    <span className="text-[100px] text-gray-400">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 mt-3">
                    <p>Title: {item.title}</p>
                    <p>Status: {item.status ? "Completed" : "Not Done Yet"}</p>
                    <p>Description: {item.description}</p>
                  </div>
                  <div className="flex flex-col gap-4 mt-3">
                    <button
                      onClick={() => handleChangeStatus(item.id, item.status)}
                      type="submit"
                      className="text-gray-100 text-sm bg-slate-600 py-2 px-5 rounded-md"
                    >
                      Change Status
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(item.id)}
                      type="submit"
                      className="text-gray-100 text-sm bg-slate-600 py-2 px-5 rounded-md"
                    >
                      Delete Todo
                    </button>
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
};

export default TodoContainer;
