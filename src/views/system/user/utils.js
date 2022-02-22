const editUserFormRules = {
  user_alias: [
    { required: true, message: '请输入用户名称', trigger: 'blur' }
  ],
  user_name: [
    { required: true, message: '请输入用户账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' }
  ],
  role_name: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
}

export {
  editUserFormRules
}
