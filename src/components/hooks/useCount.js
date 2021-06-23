import { useState } from "react";

function useCount(initialValue) {
  const [counter, setCounter] = useState(initialValue)
  const reset = () => setCounter()
  const down = () => setCounter(counter => counter -1)
  const up = () => setCounter(counter => counter +1)
  return {counter, up, down, reset, setCounter}
  
}

export default useCount