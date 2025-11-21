import { useState } from "react";


function TodoList() {
    const[tasks, setTasks] = useState([
        {name: "Prepare Hackathon UI Draft", desc: "A first sketch of the landing page and dashboard. Try different color themes and button styles. Make sure it's responsive for mobile."},
        {name: "Practice Lifting State Up in React - Mini Demo", desc: "Re-read the notes about lifting state up. Check Bro Code's examples again to confirm the flow. Create a small demo to test your understanding."},
    ])

    const [completedTask, setCompletedTasks] = useState([
        {name: "Finish Components Refactor", desc: "Separated the UI into smaller components."},
        {name: "Update Project README", desc: "Added installation steps and usage instructions."},
    ])

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");


    function addTask() {
        if (name && desc) {
            setTasks(prev => [...prev, { name, desc }]);
            setName("");
            setDesc("");
        }
    }

    function deleteTask(n) {
        const updated = tasks.filter(Element => n !== Element.name);
        setTasks(updated);
    }

    function completeTask(n, d) {
        setCompletedTasks(prev => [...prev, {name: n, desc: d}])
        deleteTask(n);
    }

    function uncompleteTask(n, d) {
        setTasks(prev => [...prev, {name: n, desc: d}])
        deleteCompletedTask(n);
    }

    function deleteCompletedTask(n) {
        const updated = completedTask.filter(Element => n !== Element.name);
        setCompletedTasks(updated);
    }

    return(
        <div className="content">
            <h1>Todo List</h1>
            <div className="adding-tasks">
                <input onChange={(e) => setName(e.target.value)} 
                value={name}
                id="task-name" placeholder="Task Name" type="text"  />
                <br /><br />
                <textarea onChange={(e) => setDesc(e.target.value)} 
                value={desc}
                name="task-desc" id="task-desc" placeholder="Task Description"></textarea>
                <br /><br />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="box">
                <div className="tasks">
                <h2>Tasks 🔜</h2>
                <ul>
                    {tasks.map((Element, index) => {
                        return <li key={index}>
                            <div className="text">
                                <h4>{Element.name}</h4>
                                <p>{Element.desc}</p>
                            </div>
                            <div className="buttons">
                                <button onClick={() => completeTask(Element.name, Element.desc)}>Done</button>
                                <button onClick={() => deleteTask(Element.name)}>Delete</button>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
            <div className="completed-tasks">
                <h2>Completed Tasks ✅</h2>
                <ul>
                    {completedTask.map((Element, index) => {
                        return <li key={index}>
                            <div className="text">
                                <h4>{Element.name}</h4>
                                <p>{Element.desc}</p>
                            </div>
                            <div className="buttons">
                                <button onClick={() => uncompleteTask(Element.name, Element.desc)}>Uncomplete</button>
                                <button onClick={() => deleteCompletedTask(Element.name)}>Delete</button>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
            </div>
        </div>
    )
}

export default TodoList; 