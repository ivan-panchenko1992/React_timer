import React, { useEffect, useState } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import './App.scss';
import 'bulma';

function App() {
  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);

  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (watchOn) {
          setTime((val) => val + 1);
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [watchOn]);

  const handleStart = () => {
    // eslint-disable-next-line no-shadow
    setWatchOn((watchOn) => !watchOn);
    if (watchOn) {
      setTime(0);
    }
  };
  const handleWait = () => {
    setWatchOn(false);
  };
  const handleReset = () => {
    setTime(0);
    setWatchOn(true);
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
          {!watchOn ? (
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
