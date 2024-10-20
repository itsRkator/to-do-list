import React, { useContext } from "react";
import { TaskContext } from "./TaskContext";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  Checkbox,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const TaskList: React.FC = () => {
  const { tasks, toggleTask, removeTask } = useContext(TaskContext);

  const updateTaskHandler = (id: string, completed: boolean) => {
    if (completed) return;
    toggleTask(id);
  };

  return (
    <>
      {tasks?.length > 0 ? (
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task._id}
              dense
              onClick={() => updateTaskHandler(task._id, task.completed)}
              sx={{
                border: `1px solid ${task.completed ? "#54ad34" : "lightgrey"}`,
                borderRadius: "0.75rem",
                margin: "0.5rem",
                cursor: task.completed ? "default" : "pointer",
                backgroundColor: task.completed ? "#e6ffe6" : "white",
                display: "flex",
                alignItems: "center",
                padding: "0.5rem",
              }}
            >
              <Checkbox
                checked={task.completed}
                disabled
                icon={<RadioButtonUncheckedIcon sx={{ color: "lightgrey" }} />}
                checkedIcon={
                  <CheckCircleOutlineIcon sx={{ color: "#54ad34" }} />
                }
                sx={{
                  padding: "0",
                  marginRight: "0.5rem",
                }}
              />
              <ListItemText primary={task.title} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTask(task._id);
                  }}
                  size="small"
                  sx={{ marginLeft: "0.5rem" }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box textAlign="center">
          There is currently no Task for the selected type...
        </Box>
      )}
    </>
  );
};

export default TaskList;
