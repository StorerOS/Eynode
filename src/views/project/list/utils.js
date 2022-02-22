const createFormRules = {
  project_name: [
    { required: true, message: '请输入项目名称', trigger: 'blur' }
  ]
}

const editFormRules = {
  project_name: [
    { required: true, message: '请输入项目名称', trigger: 'blur' }
  ]
}

export {
  createFormRules,
  editFormRules
}
