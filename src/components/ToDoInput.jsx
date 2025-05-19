import React from "react";

export default function ToDoInput(props) {
    const { handleAddTodos, todoValue, setTodoValue } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTodos(todoValue);
        setTodoValue("");
    };

    return (
        <header>
            <form onSubmit={handleSubmit}>
                <input
                    value={todoValue}
                    onChange={(e) => setTodoValue(e.target.value)}
                    placeholder="Start doing, start typing..."
                />
                <button type="submit">
                    Add
                </button>
            </form>
        </header>
    );
}