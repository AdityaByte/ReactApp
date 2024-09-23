import { useState , useCallback , useEffect , useRef } from "react"; 

const PasswordGenerator = () => {

    const [length , setLength] = useState(8);
    const [numberAllowed , setNumberAllowed] = useState(false);
    const [charAllowed , setCharAllowed] = useState(false);
    const [password , setPassword] = useState('');

    //useRef returns a mutable object whoes current value is initialized by passing the argument.
    const passwordRef = useRef(null);

    // useCallback is a react hook which cache a function defination between re-renders. 
    const passwordGenerator = useCallback(()=>{
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if(numberAllowed) str += "0123456789";
        if(charAllowed) str += "!@#$%^&*()_+-={}[]:;<>,./?~`'";

        for(let i=1; i<=length ; i++){
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }

        setPassword(pass);

    } , [length , numberAllowed , charAllowed , setPassword]);

    // Use effect hook synchronize our code with similar function(check out original def)
    useEffect(()=>{
        passwordGenerator()
    } , [length , numberAllowed , charAllowed , passwordGenerator]);

    const copyPasswordToClipboard = useCallback(()=>{
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,4);
        window.navigator.clipboard.writeText(password);
    }, [password]);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray">
                <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 h-64 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-#000-600">Password Generator</h1>
                    <div className="w-full p-4 my-3">
                        <input 
                            className="w-3/4 bg-[#f3ff3f] py-2 px-6 rounded-lg rounded-tr-none rounded-br-none font-bold" 
                            type="text"
                            placeholder="Password"
                            value={password}
                            ref={passwordRef}
                            readOnly
                        />
                        <button 
                        onClick={copyPasswordToClipboard}
                        className="w-1/4 bg-blue-700 py-2 px-6 rounded-tr-lg rounded-br-lg text-white font-bold"
                        >
                            Copy
                        </button>
                    </div>
                    <div className="flex gap-x-2">
                        <input
                            id="range"
                            type="range"
                            min={6}
                            max={20}
                            value={length}
                            className="cursor-pointer"
                            onChange={(event) => setLength(event.target.value)}
                        />
                        <label htmlFor="range">Length : {length}</label>
                        <input
                            id="numberInput"
                            type="checkbox"
                            defaultChecked={numberAllowed}
                            onChange={() => {
                                setNumberAllowed(
                                    (prev) => !prev
                                )
                            }}
                        />
                        <label htmlFor="numberInput">Number Allowed</label>
                        <input
                            id="characterInput"
                            type="checkbox"
                            defaultChecked={charAllowed}
                            onChange={
                                () => {
                                    setCharAllowed(
                                        (prev) => !prev
                                    )
                                }
                            }
                        />
                        <label htmlFor="characterInput">Character Allowed</label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PasswordGenerator;