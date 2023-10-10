import { useCallback, useState } from "react"

export default function useFormValidation() {
    const [dataInput, setDataInput] = useState({})//input te[t]
    const [validText, setValidText] = useState({})//span text 
    const [validState, setValidState] = useState(false)//anable button

    const [solidLine, setSolidLine] = useState({})//solitline

    function eraseInpup(data = {}) {
        setValidState(false)//anable button
        setValidText({})//span text
        setSolidLine({})//solitline
        setDataInput(data)//input te[t] 
    }

    const initialInput = useCallback((value, name) => {
        setDataInput((data) => {
            return { ...data, [name]: value }
        })
    }, [])

    function handleTransitForm(evt) {

        const form = evt.target.form
        const name = evt.target.name
        const value = evt.target.value
        const validMessage = evt.target.validationMessage
        const verify = evt.target.validity.valid

        setValidState(form.checkValidity())

        setValidText((data) => {
            return { ...data, [name]: validMessage }
        })

        setDataInput((data) => {
            return { ...data, [name]: value }
        })

        setSolidLine((data) => {
            return { ...data, [name]: verify }
        })
    }

    return { dataInput, validText, validState, solidLine, handleTransitForm, eraseInpup, initialInput }
}