const createFormRules = {
  project_name: [
    { required: true, message: 'Please enter a project name', trigger: 'blur' }
  ]
}

const editFormRules = {
  project_name: [
    { required: true, message: 'Please enter a project name', trigger: 'blur' }
  ]
}

export {
  createFormRules,
  editFormRules
}
