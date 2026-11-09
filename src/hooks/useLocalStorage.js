import { useState } from 'react'

// TODO: Implement the useLocalStorage custom hook
// This hook should:
// 1. Accept a key and initial value
// 2. Return [storedValue, setValue] like useState
// 3. Sync with localStorage
// 4. Handle JSON parsing/stringifying

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  return [storedValue, setValue]
}

// Example implementation structure:
/*
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    // TODO: Get from localStorage
  })

  const setValue = (value) => {
    // TODO: Save to state and localStorage
  }

  return [storedValue, setValue]
}
*/