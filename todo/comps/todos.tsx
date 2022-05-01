import { uid } from 'uid'
import { useState , useEffect, useRef } from "react"
import { Card, CardContent, Modal, List, ListItem, Box, Button, IconButton, TextField, Typography } from "@mui/material"
import styles from "../styles/Todos.module.css"
import { TransitionGroup } from 'react-transition-group';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function Todos () {
    const [ text, setText ] = useState("")
    const [ todos, setTodos ] = useState(() => window.localStorage.todos ? localStorage.todos:[])
    const [ showClearTodosModal, setShowClearTodosModal] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        if (localStorage.todos) {
            setTodos(JSON.parse(localStorage.todos))
        }
    }, [])
    useEffect(() => {
        // if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos))
        // }
    }, [todos])

    function handleSubmit(e) {
        e.preventDefault()
        const id = uid()
        setTodos([{text, done:false, id:id}, ...todos])
        setText("")
    }

    function markDone(e) {
        setTodos(todos.map(todo => {
            if (e.target.innerText === todo.text) {
                console.log("inside")
                return {text:todo.text, done:!todo.done}
            } else {
                return todo
            }
        }))
    }

    function deleteTodo(id: string) {
        const newtodos = todos.filter(todo => todo.id !== id)
        console.log('newtodos:', newtodos)
        setTodos(newtodos)
    }

    return (
        <Box>
            <form
                onSubmit={handleSubmit}
            >
                <TextField 
                    className={styles.entryfield}
                    label="Add a todo"
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    ref={inputRef}
                />
            </form>

            <Button 
                 color="primary" 
                 aria-label="upload picture" 
                 component="span"
                    className={styles.clearall} 
                    onClick={() => setShowClearTodosModal(true)}
                startIcon={<ReportProblemIcon />}
            >
                Delete All Todos
            </Button>
            <Modal
              open={showClearTodosModal}
              onClose={() => setShowClearTodosModal(false)}
              aria-labelledby="delete all todos"
              aria-describedby="delete all todos"
              className={styles.deleteallmodal}
            >
              <Box className={styles.modalbox}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Delete all todos?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete all todos? This action is irreversable and you will lose all of your todos.
                </Typography>
                <Button
                    onClick={() => setShowClearTodosModal(false)}
                    variant="contained"
                    sx={{m:1}}
                >
                Nah, don't delete my todos
                </Button>
                <Button 
                    onClick={() => {
                        setTodos([])
                        setShowClearTodosModal(false)
                    }}
                    variant="contained"
                    startIcon={<ReportProblemIcon />}
                    sx={{
                        m:1,
                        color: "maroon",
                    }}
                >
                Yes I&apos;m sure delete all of them
                </Button>
              </Box>
            </Modal>

            <List>
            {todos.map(todo =>(
                <ListItem 
                    key={todo.id}
                    onClick={markDone}
                >
                    <Card className={styles.card}
                    >
                            <IconButton 
                                className={styles.icons}
                                onClick={() => deleteTodo(todo.id)}
                                aria-label="delete"
                            >
                              <DeleteIcon fontSize="small"/>
                            </IconButton>
                            <IconButton 
                                className={styles.icons}
                                aria-label="edit"
                            >
                              <EditIcon fontSize="small"/>
                            </IconButton>
                            <Typography
                                    variant="body1"
                                    style= {{
                                        color: todo.done ? "#555" : "",
                                        margin: 10,
                                    }}
                            >
                                {todo.text}
                            </Typography>
                    </Card>
                </ListItem>
                )
            )}
            </List>
        </Box>
    )
}
