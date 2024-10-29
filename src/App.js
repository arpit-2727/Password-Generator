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
    <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden animated-bg">
      {/* Glassmorphism Card */}
      <div className="relative z-10 p-8 max-w-md w-full glass-card shadow-2xl animate-float">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 animate-slide-down neon-text">
          Password Generator
        </h1>

        <div className="flex items-center glass-input mb-6 hover:shadow-xl animate-fade-in">
          <input
            type="text"
            value={password}
            className="outline-none px-4 py-3 w-full text-lg text-white bg-transparent"
            placeholder="Your password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="neon-button px-4 py-2 text-lg"
          >
            Copy
          </button>
        </div>

        <div className="mb-8 animate-fade-in-delayed">
          <label className="block text-lg font-medium text-white mb-2">
            Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="w-full h-2 slider"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center justify-between mb-8 animate-fade-in-slow">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="cursor-pointer h-5 w-5 neon-checkbox"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-lg text-white">
              Include Numbers
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              className="cursor-pointer h-5 w-5 neon-checkbox"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput" className="text-lg text-white">
              Include Characters
            </label>
          </div>
        </div>

        <button
          onClick={passwordGenerator}
          className="w-full neon-button py-3 text-lg font-semibold shadow-lg"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
