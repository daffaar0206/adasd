import { useState } from 'react';
import { Calculator, History, RefreshCw, Sun, Moon } from 'lucide-react';

export default function CalculatorApp() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isScientific, setIsScientific] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = (value: string) => {
    if (value === '=') {
      try {
        const calculation = eval(input);
        setResult(calculation.toString());
        setHistory([...history, `${input} = ${calculation}`]);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'CE') {
      setInput(input.slice(0, -1));
    } else if (value === '±') {
      setInput(input.startsWith('-') ? input.slice(1) : `-${input}`);
    } else if (value === '√') {
      setInput(`Math.sqrt(${input})`);
    } else if (value === '^') {
      setInput(`${input}**`);
    } else if (value === '!') {
      setInput(`factorial(${input})`);
    } else if (value === 'π') {
      setInput(input + Math.PI);
    } else if (value === 'e') {
      setInput(input + Math.E);
    } else {
      setInput(input + value);
    }
  };

  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const toggleMode = () => {
    setIsScientific(!isScientific);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const basicButtons = ['C', 'CE', '/', '*', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'];
  const scientificButtons = ['(', ')', 'π', 'e', '√', '^', '!', '±', 'sin', 'cos', 'tan', 'log', 'ln', 'exp', 'deg', 'rad'];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-100'} flex items-center justify-center p-4`}>
      <div className={`${isDarkMode ? 'bg-gray-800/90 text-white' : 'bg-white/70'} backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md overflow-hidden`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calculator className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Calculator</h1>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={toggleMode}
                className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full`}
              >
                {isScientific ? (
                  <span className="text-sm font-medium">Basic</span>
                ) : (
                  <span className="text-sm font-medium">Sci</span>
                )}
              </button>
              <button 
                onClick={toggleTheme}
                className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <button 
                onClick={() => setHistory([])}
                className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full`}
              >
                <RefreshCw className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 h-20 flex flex-col justify-end`}>
              <div className={`text-right text-sm overflow-x-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                {input || '0'}
              </div>
              <div className={`text-right text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {result || '0'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {basicButtons.map((btn) => (
              <button
                key={btn}
                onClick={() => handleClick(btn)}
                className={`p-4 rounded-xl text-lg font-medium transition-all
                  ${
                    btn === '='
                      ? `col-span-2 ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white`
                      : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`
                  }
                  ${
                    ['/', '*', '-', '+'].includes(btn)
                      ? `${isDarkMode ? 'bg-purple-700/50 hover:bg-purple-700/70' : 'bg-purple-100 hover:bg-purple-200'} ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`
                      : ''
                  }`}
              >
                {btn}
              </button>
            ))}

            {isScientific && scientificButtons.map((btn) => (
              <button
                key={btn}
                onClick={() => handleClick(btn)}
                className={`p-4 rounded-xl text-sm font-medium transition-all
                  ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}
                  ${['sin', 'cos', 'tan', 'log', 'ln', 'exp'].includes(btn) ? 'col-span-2' : ''}`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {history.length > 0 && (
          <div className={`${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50/50'} p-6 border-t`}>
            <div className="flex items-center gap-2 mb-4">
              <History className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <h2 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>History</h2>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {history.map((item, index) => (
                <div key={index} className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
