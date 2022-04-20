import { uid } from 'uid'
import { useState , useEffect } from "react"
import { Card, CardContent, List, Box, TextField, Typography } from "@mui/material"
import styles from "../styles/Todos.module.css"
import { TransitionGroup } from 'react-transition-group';

export default function Todos () {
    const [ text, setText ] = useState("")
    const [ todos, setTodos ] = useState([])

    useEffect(() => {
        if (localStorage.todos) {
            setTodos(JSON.parse(localStorage.todos))
        }
    }, [])
    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos))
        }
    }, [todos])

    function handleSubmit(e) {
        e.preventDefault()
        const id = uid()
        setTodos([{text, done:false, id:id}, ...todos])
        setText("")
    }

    function markDone(e) {
        setTodos(todos.map(todo => {
            console.log(e.target.getAttribute("id"))
            if (e.target.innerText === todo.text) {
                console.log("inside")
                return {text:todo.text, done:!todo.done}
            } else {
                return todo
            }
        }))
    }
    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <TextField 
                    className={styles.entryfield}
                    label="Add a todo"
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </form>

            <List>
            {todos.map(todo =>(
                <Card className={styles.card}
                        key={todo.id}
                        onClick={markDone}
                        id={todo.id}
                >
                    <CardContent>
                        <Typography
                                variant="body1"
                                style= {{
                                    color: todo.done ? "#555" : ""
                                }}
                        >
                            {todo.text} - {todo.id}
                        </Typography>
                    </CardContent>
                </Card>
                )
            )}
            </List>
        </div>
    )
}
