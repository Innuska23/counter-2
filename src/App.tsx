import { useEffect, useState } from 'react';

import { Button } from './components/button/Button';
import { BoardCounter } from './components/boardCounter/BoardCounter';
import { SetCounter } from './components/setCounter/SetCounter';

import './App.css';

function App() {
  const INITIAL_COUNTER = 0;
  const INITIAL_MAX_VALUE = 5;

  type StorageKey = 'maxValue' | 'counter' | 'isSettingMode';

  const [counter, setCounter] = useState<number>(INITIAL_COUNTER);
  const [maxValue, setMaxValue] = useState<number>(INITIAL_MAX_VALUE);
  const [isSettingMode, setIsSettingMode] = useState<boolean>(false);

  const disabledIsEqual = counter === maxValue;
  const disabledMinus = counter < INITIAL_COUNTER || maxValue < INITIAL_COUNTER;
  const disabledReset = counter === INITIAL_COUNTER;

  useEffect(() => {
    const loadState = <T extends number | boolean>(key: StorageKey, defaultValue: T): T => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    };

    setMaxValue(loadState('maxValue', 5));
    setCounter(loadState('counter', 0));
    setIsSettingMode(loadState('isSettingMode', false));
  }, []);


  useEffect(() => {
    const saveState = (key: string, value: number | boolean) => {
      localStorage.setItem(key, JSON.stringify(value));
    };

    saveState('maxValue', maxValue);
    saveState('counter', counter);
    saveState('isSettingMode', isSettingMode);
  }, [maxValue, counter, isSettingMode])

  const incHandler = () => {
    if (counter < maxValue) {
      setCounter(prevCounter => prevCounter + 1)
    }
  }

  const resetHandler = () => setCounter(INITIAL_COUNTER);

  const toggleSettingMode = () => setIsSettingMode(!isSettingMode);

  const renderCounterMode = () => (
    <>
      <BoardCounter
        counter={counter}
        maxValue={maxValue}
      />
      <div className='ButtonContainer'>
        <Button
          onClick={incHandler}
          disabled={disabledIsEqual}>
          inc
        </Button>
        <Button
          onClick={resetHandler}
          disabled={disabledReset}
        >
          reset
        </Button>
        <Button
          onClick={toggleSettingMode}>
          set
        </Button>
      </div>
    </>
  );

  const renderSettingMode = () => (
    <>
      <SetCounter
        counter={counter}
        maxValue={maxValue}
        setCounter={setCounter}
        setMaxValue={setMaxValue}
      />
      <div className='ButtonContainer'>
        <Button
          onClick={toggleSettingMode}
          disabled={disabledIsEqual || disabledMinus}>
          set
        </Button>
      </div>
    </>
  );

  return (
    <div className="App">
      <div className="Container">
        {isSettingMode ? renderSettingMode() : renderCounterMode()}
      </div>
    </div>
  );
}

export default App;