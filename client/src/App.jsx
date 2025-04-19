import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, List, ListItem, Checkbox, IconButton, Card, CardContent, CardActions, MenuItem } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A237E',
    },
    secondary: {
      main: '#FAF3E0',
    },
    background: {
      default: '#FAF3E0',
    },
    text: {
      primary: '#1A237E',
    },
  },
  typography: {
    h3: {
      fontWeight: 'bold',
      color: '#1A237E',
      fontSize: '2.5rem',
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low'); // Priority state
  const [isEditing, setIsEditing] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [completionFilter, setCompletionFilter] = useState('All');

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/api/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title) return;
    const res = await axios.post('http://localhost:5000/api/todos', { title, priority });
    setTodos([...todos, res.data]);
    setTitle('');
    setPriority('Low'); // Reset priority after adding task
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  const updateTodo = async (id) => {
    if (!editedTitle) return;
    const res = await axios.put(`http://localhost:5000/api/todos/${id}`, { title: editedTitle });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    setIsEditing(null);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (completionFilter === 'All' ||
     (completionFilter === 'Completed' && todo.completed) ||
     (completionFilter === 'Not Completed' && !todo.completed))
  );

  // Function to get the color based on priority
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High':
        return '#ff4d4d'; // Red for High priority
      case 'Medium':
        return '#ffcc00'; // Yellow for Medium priority
      case 'Low':
        return '#66ff66'; // Green for Low priority
      default:
        return '#cccccc'; // Default gray if priority is not set
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        background: '#FAF3E0',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}>
        <Container maxWidth="sm">
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <Typography variant="h3" align="center" style={{ marginBottom: '2rem' }}>
              📝 To-Do App
            </Typography>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <TextField
                label="Search Tasks"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <TextField
                select
                label="Filter"
                value={completionFilter}
                onChange={(e) => setCompletionFilter(e.target.value)}
                style={{ minWidth: '160px' }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Not Completed">Not Completed</MenuItem>
              </TextField>
            </div>

            <TextField
              label="Task Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />

            <TextField
              select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              fullWidth
              style={{ marginBottom: '1rem' }}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </TextField>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={addTodo}
                style={{ marginBottom: '2rem', borderRadius: '10px' }}
              >
                Add Task
              </Button>
            </motion.div>
          </motion.div>

          <List>
            {filteredTodos.map(todo => (
              <motion.div
                key={todo._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ListItem>
                  <Card style={{
                    margin: '10px 0',
                    width: '100%',
                    borderRadius: '15px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#ffffff',
                    transition: 'transform 0.3s',
                  }}>
                    <CardContent>
                      {isEditing === todo._id ? (
                        <TextField
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          label="Edit Task"
                          fullWidth
                        />
                      ) : (
                        <>
                          <Checkbox
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo._id, todo.completed)}
                            style={{ color: '#1A237E' }}
                          />
                          <span
                            style={{
                              textDecoration: todo.completed ? 'line-through' : 'none',
                              color: todo.completed ? '#A0A0A0' : '#1A237E',
                              fontWeight: 'bold',
                            }}
                          >
                            {todo.title}
                          </span>
                          <span
                            style={{
                              marginLeft: '10px',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              backgroundColor: getPriorityColor(todo.priority), // Applying priority color
                              color: 'white',
                            }}
                          >
                            {todo.priority}
                          </span>
                        </>
                      )}
                    </CardContent>
                    <CardActions>
                      {isEditing === todo._id ? (
                        <Button size="small" color="primary" onClick={() => updateTodo(todo._id)}>
                          Save
                        </Button>
                      ) : (
                        <>
                          <IconButton onClick={() => {
                            setIsEditing(todo._id);
                            setEditedTitle(todo.title);
                          }}>
                            <EditIcon style={{ color: '#1A237E' }} />
                          </IconButton>
                          <IconButton onClick={() => deleteTodo(todo._id)}>
                            <DeleteIcon style={{ color: '#1A237E' }} />
                          </IconButton>
                        </>
                      )}
                    </CardActions>
                  </Card>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
