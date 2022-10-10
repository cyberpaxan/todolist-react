import { useState } from 'react';
import './TodoForm.css';

function TodoForm() {
    const [task, setTask] = useState(''); // обработчик инпута
    const [array, setArray] = useState([]); // создание массива

    function uuidv4() {
        // функция создания уникального id
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
            (
                c ^
                (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16)
        );
    }

    function addTask() {
        if (task === '') {
            // проверка input на наличие символов в нем
            return alert('Напишите задачу!');
        }
        const item = {
            name: task,
            id: uuidv4(),
        };
        setArray((array) => [...array, item]); // добавляем item в array (деструктуризация array и добавление в него item в начало)
        setTask('');
    }

    function deleteTask(prop) {
        let cleanTask = array.filter((item) => item.id !== prop.id); // функция удаления конкретных задач по нажатию кнопки рядом с ними
        setArray(cleanTask); // реализуется через filter
    }

    return (
        <div>
            <h1 className='title'>Todo app</h1>

            <form // form используется для реализации "подтверждения" кнпоки через type='submit'

                onSubmit={(event) => { // onSubmit позволяет сделать preventDefault с form
                    event.preventDefault();
                }}
            >
                <input
                    id='input-task'
                    className='input-task'
                    type='text'
                    placeholder='Write your task here'
                    value={task} // привязка значения input к таск (благодаря этому можно сделать функционал как на 21 строке)
                    onChange={(event) => setTask(event.target.value)} // считывание написанного в инпуте
                />
                <button className='add-button-task' type='submit' onClick={addTask}>
                    Add
                </button>
                {array.map((item, id) => {
                    // пробег по массиву array и вывод полученных элементов в div блоке
                    return (

                        <div className='tasks' key={id}>
                            {item.name}
                            <button
                                type='submit'
                                className='taskDelete'
                                onClick={() => deleteTask(item)} // функция применяется для однократного срабатывания функции при нажатии
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}
            </form>
        </div>
    );
}

export default TodoForm;
