import React, { useState } from "react";
import Layout from "./Layout/Layout";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";
import "./css/todo.css";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

const Todo = () => {
  const [todoInput, setTodoInput] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editedTodo, setEditedTodo] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTodo = todoInput.trim();
    if (!trimmedTodo) return;
    const newTodo: Todo = {
      id: Date.now(),
      todo: trimmedTodo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    toast.success("Todo added Successfully");
    setTodoInput("");
  };

  const handleCheckboxChange = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    toast.success("Todo status updated Successfully");
  };

  const handleEdit = (id: number) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditedTodo(todoToEdit.todo);
      setEditTodoId(id);
      setOpenEditDialog(true);
    }
  };

  const handleEditSubmit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editTodoId ? { ...todo, todo: editedTodo } : todo
    );
    setTodos(updatedTodos);
    toast.success("Todo edited Successfully");
    setOpenEditDialog(false);
  };

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    toast.success("Todo deleted Successfully");
  };

  return (
    <Layout>
      <div className="todo-container">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h5">Enter Your Task - Todo </Typography>
          <TextField
            required
            id="todo"
            name="todo"
            label="Add Todo"
            value={todoInput}
            onChange={handleChange}
            style={{ margin: "10px", width: "300px" }}
          />
          <Button variant="contained" color="primary" type="submit">
            Add Todo
          </Button>
        </form>

        {todos && todos.length > 0 ? (
          <TableContainer component={Paper}>
            <Table aria-label="todos table" className="todo-table container">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      color: "white",
                      fontSize: ".9rem",
                      fontWeight: "bold",
                    }}
                  >
                    S.NO
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      fontSize: ".9rem",
                      fontWeight: "bold",
                    }}
                  >
                    Todo
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      fontSize: ".9rem",
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      fontSize: ".9rem",
                      fontWeight: "bold",
                    }}
                  >
                    Operation
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo, index) => (
                  <TableRow key={todo.id} style={{ paddingBottom: "5px" }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{todo.todo}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => handleCheckboxChange(todo.id)}
                      />
                      {todo.completed ? "Completed" : "Not Completed"}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(todo.id)}>
                        <Typography variant="h6">Edit</Typography>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(todo.id)}>
                        <Typography variant="h6">Delete</Typography>

                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          ""
        )}
      </div>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="edited-todo"
            label="Edit Todo"
            type="text"
            fullWidth
            value={editedTodo}
            onChange={(e) => setEditedTodo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Todo;
