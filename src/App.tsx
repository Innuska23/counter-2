import { useEffect, useState } from 'react';

import { Button } from './components/button/Button';
import { BoardCounter } from './components/boardCounter/BoardCounter';
import { SetCounter } from './components/setCounter/SetCounter';

import './App.css';

function App() {
  const [maxValue, setMaxValue] = useState<number>(0);
  const [startValue, setStartValue] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [isSet, setIsSet] = useState<boolean>(false);

  const isError = startValue < 0 || maxValue <= startValue;

  useEffect(() => {
    const loadState = <T extends number | boolean>(key: string, defaultValue: T): T => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    };

    setMaxValue(loadState('maxValue', 0));
    setStartValue(loadState('startValue', 0));
    setCounter(loadState('counter', 0));
    setIsSet(loadState('isSet', false));
  }, []);


  useEffect(() => {
    const saveState = (key: string, value: number | boolean) => {
      localStorage.setItem(key, JSON.stringify(value));
    };

    saveState('maxValue', maxValue);
    saveState('startValue', startValue);
    saveState('counter', counter);
    saveState('isSet', isSet);
  }, [maxValue, startValue, counter, isSet])

  const incHandler = () => {
    if (counter < maxValue) {
      setCounter(prevCount => prevCount + 1);
    }
  };

  const setHandler = () => {
    if (maxValue > startValue) {
      setCounter(startValue);
      setIsSet(true);
    }
  };

  const resetHandler = () => {
    setCounter(startValue);
    setIsSet(false);
  };

  const handleValueChange = (isMax: boolean) => (newValue: number) => {
    if (isMax) {
      setMaxValue(newValue);
    } else {
      setStartValue(newValue);
    }
    setIsSet(false);
  };

  return (
    <div className="App">

      <div className="Container">
        <SetCounter
          maxValue={maxValue}
          setMaxValue={handleValueChange(true)}
          setStartValue={handleValueChange(false)}
          startValue={startValue}
        />

        <div className='ButtonContainer'>
          <Button onClick={() => setHandler()} disabled={isSet || isError}>
            set
          </Button>
        </div>

      </div>

      <div className="Container">
        <BoardCounter
          value={!isSet ? `enter values and press 'set'` : counter}
          maxValue={maxValue}
          counter={counter}
          startValue={startValue}
        />

        <div className='ButtonContainer'>
          <Button
            onClick={incHandler}
            disabled={!isSet || isError || counter === maxValue}
          >
            inc
          </Button>
          <Button
            onClick={resetHandler}
            disabled={!isSet || isError || counter === startValue}
          >
            reset
          </Button>
        </div>

      </div>
    </div>
  );
}

export default App;