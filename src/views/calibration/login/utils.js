export const formRules = {
  name: [
    { required: true, trigger: 'blur', message: 'Please enter the email' },
    { pattern: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g, message: 'Please enter the correct email', trigger: 'blur' }
  ],
  email: [
    { required: true, trigger: 'blur', message: 'Please enter the email' },
    { pattern: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g, message: 'Please enter the correct email', trigger: 'blur' }
  ],
  password: [{ required: true, trigger: 'blur', message: 'Please enter the passowrd' }]
}
