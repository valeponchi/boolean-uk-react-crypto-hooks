import { useState } from "react"

function useToggle(initialValue = true) {
  const [boolean, setBoolean] = useState(initialValue)
  const toggle = () => setBoolean(boolean => !boolean)
  
  return [boolean, toggle]
}

export default useToggle
