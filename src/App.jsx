import React, { useEffect, useState } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import './App.scss';
import 'bulma';

function App() {
  const [time, setTime] = useState(0);
  const [watchStart, setWatchStart] = useState(false);

  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (watchStart) {
          setTime((prevTime) => prevTime + 1);
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [watchStart]);

  const handleStart = () => {
    setWatchStart((prevWatchOn) => !prevWatchOn);
    if (watchStart) {
      setTime(0);
    }
  };
  const handleWait = () => {
    setWatchStart(false);
  };
  const handleReset = () => {
    setTime(0);
    setWatchStart(true);
  };

  return (
    <div>
      <header className="header">
        <h1>StopWatch</h1>
        <div className="header__timer">
          <span>
            {(`0${Math.floor((time / 3600) % 100)}`).slice(-2)}
            :
          </span>
          <span>
            {(`0${Math.floor((time / 60) % 60)}`).slice(-2)}
            :
          </span>
          <span>
            {(`0${Math.floor(time % 60)}`).slice(-2)}
          </span>
        </div>
        <div className="header__button">
          {!watchStart ? (
            <button
              className="button"
              type="button"
              onClick={handleStart}
            >
              Start
            </button>
          ) : (
            <button
              className="button"
              onClick={handleStart}
              type="button"
            >
              Stop
            </button>
          )}
          <button
            className="button"
            type="button"
            onClick={handleWait}
          >
            Wait
          </button>
          <button
            className="button"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
