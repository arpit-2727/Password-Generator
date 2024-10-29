import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-powder-blue">
      {/* Floating and Glowing Card */}
      <div className="relative max-w-md w-full p-8 bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg animate-float hover:animate-glow transition-all duration-500">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-5 shadow-md transition-shadow duration-300">
          <input
            type="text"
            value={password}
            className="outline-none px-4 py-3 w-full text-lg text-gray-800 bg-transparent"
            placeholder="Your password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 text-lg transition-transform transform hover:scale-105"
          >
            Copy
          </button>
        </div>

        {/* Length Slider */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        {/* Options */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="cursor-pointer h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-lg text-gray-800">
              Include Numbers
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              className="cursor-pointer h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput" className="text-lg text-gray-800">
              Include Characters
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={passwordGenerator}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition-transform transform hover:scale-105"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
