import { useState } from "react"

const handleOnChangeHook = (e, formData, setFormData) => {
  const { name, value } = e.target

  setFormData({
    ...formData,
    [name]: value
  })
}

const useForm = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData)
  const [isLoading, setIsLoading] = useState(false)


  return {
    formData,
    setFormData,
    handleOnChange: (e) => handleOnChangeHook(e, formData, setFormData),
    isLoading,
    setIsLoading,
  }
}

export default useForm