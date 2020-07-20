import { useState } from 'react'

export const useField = (form) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    form
      ? setValue(event.target.value)
      : setValue('')
  }

  const onReset = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    onReset
  }
}