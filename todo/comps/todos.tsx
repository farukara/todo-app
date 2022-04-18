import { useState , useEffect } from "react"
import { List, ListItem, ListItemText, Box, TextField, Typography } from "@mui/material"
import styles from "../styles/Todos.module.css"
import { TransitionGroup } from 'react-transition-group';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';





export default function Todos () {
    const [ text, setText ] = useState("")
    const [ todos, setTodos ] = useState([])

    useEffect(() => {
        setTodos(JSON.parse(localStorage.todos))
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        setTodos([{text, done:false}, ...todos])
        setText("")
    }

    function markDone(e) {
        setTodos(todos.map(todo => {
            console.log(e.target.innerText)
            console.log(todo.text)
            if (e.target.innerText === todo.text) {
                console.log("inside")
                return {text:todo.text, done:!todo.done}
            } else {
                return todo
            }
        })
        )
        console.log(todos)
    }
    return (
        <Box>
            <form
                onSubmit={handleSubmit}
            >
                <TextField 
                    className="styles.entryfield"
                    label="Add a todo"
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </form>

            <List>
            <TransitionGroup>
            {todos.map(todo => {
                return (<ListItem
                        variant="body1"
                        key={todo.text}
                        onClick={markDone}
                        style= {{
                        color: todo.done ? "#555" : ""
                    }}
                    >
                        {todo.text}
                    </ListItem>
                )
            })}
            </TransitionGroup>
            </List>
        </Box>
    )
}
