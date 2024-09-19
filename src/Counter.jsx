import { useState } from "react";

function Counter(){

    let [counter , setCounter ] = useState(12);

    const increment = () => {
        setCounter(counter + 1);
        console.log("number value - " + counter);
    }

    const decrement = () => {
        setCounter(counter - 1);
        console.log("number value - " + counter);
    }

    return (
        <>
            <h1>Counter - {counter}</h1>
            <button onClick={increment}>Increment {counter}</button>
            <button onClick={decrement}>Decrement {counter}</button>
        </>
    )
}

export default Counter;