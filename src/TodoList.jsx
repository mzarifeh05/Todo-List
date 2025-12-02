import { useState } from "react";


function TodoList() {
    const[tasks, setTasks] = useState([
        {name: "", desc: ""},
    ])

    const [completedTask, setCompletedTasks] = useState([
        {name: "", desc: ""},
    ])

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const [oldName, setOldName] = useState("");
    const [editing, setEditing] = useState(false);


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

    function edit() {
        const edited =
        tasks.map(Element => {
            if (Element.name === oldName)
                return {name: name, desc: desc};
            else 
                return Element;
        });
        setTasks(edited);
        setEditing(false)
        setName("")
        setDesc("")
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
                <button onClick={() => {
                    if (!editing)
                        addTask();
                    else
                        edit();
                }}>{!editing? "Add Task" : "Edit"}</button>
            </div>
            <div className="box">
                <div className="tasks">
                <h2>Tasks 🔜</h2>
                <ul>
                    {tasks.map((Element, index) => {
                        if (Element.name && Element.desc)
                            return <li key={index}>
                                <div className="text">
                                    <h4>{Element.name}</h4>
                                    <p>{Element.desc}</p>
                                </div>
                                <div className="buttons">
                                    <button onClick={() => completeTask(Element.name, Element.desc)}>Done</button>
                                    <button onClick={() => deleteTask(Element.name)}>Delete</button>
                                    <button 
                                        onClick={() => {
                                            setEditing(true);
                                            setOldName(Element.name);
                                            setName(Element.name);
                                            setDesc(Element.desc);
                                        }}>Edit
                                    </button>
                                </div>
                            </li>
                    })}
                </ul>
            </div>
            <div className="completed-tasks">
                <h2>Completed Tasks ✅</h2>
                <ul>
                    {completedTask.map((Element, index) => {
                        if (Element.name && Element.desc)
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