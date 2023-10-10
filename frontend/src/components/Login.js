import RegistrationForm from './RegistrationForm'
import useFormValidation from '../hooks/ValidationForm'
import Input from "./Input";


export default function Login({ handleLogin }) {
  const { dataInput, validText, validState, solidLine, handleTransitForm } = useFormValidation()

  function onLogin(evt) {
    evt.preventDefault()
    handleLogin(dataInput.password, dataInput.email)
  }

  return (
    <RegistrationForm name='signin' onSubmit={onLogin} isValid={validState}>
      <Input
        name='email'
        type='email'
        placeholder={'Email'}
        value={dataInput.email}
        isInputValid={solidLine.email}
        onChange={handleTransitForm}
        error={validText.email}
      />
      <Input
        name='password'
        type='password'
        minLength={3}
        placeholder={'Пароль'}
        value={dataInput.password}
        isInputValid={solidLine.password}
        onChange={handleTransitForm}
        error={validText.password}
      />
    </RegistrationForm>
  )
}


