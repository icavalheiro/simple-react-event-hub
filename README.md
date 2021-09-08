# Simple React Event Hub

A simple hub that your react components can use to listen for events triggered by other components (using the hooks api)

Example usage:

CounterDisplay.js

```js
import { useState } from 'react';
import { useEvent } from 'simple-react-event-hub';

function CounterDisplay () {
  const [ counter, setCounter ] = useState( 0 );

  useEvent( 'counter_increase', () => {
    setCounter( counter + 1 );
  } );

  return (
    <span>
      Counter { counter }
    </span>
  );
}

export default CounterDisplay;
```


CounterButton.js

```js
import { dispatchEvent } from "simple-react-event-hub";

function CounterButton () {
  return (
    <button onClick={ () => dispatchEvent( 'counter_increase', null ) }>
      Click me
    </button>
  );
}

export default CounterButton;
```