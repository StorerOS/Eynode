export const editRoleFormRules = {
  role_name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ]
}

export function findPermissionItem(list, name) {
  let findItem
  const main = (list, name) => {
    if (!list || list.length <= 0) null
    return list.find(child => {
      if (child.name === name) {
        findItem = child
        return true
      }
      const findObj = child.children && main(child.children, name)
      if (findObj) {
        return true
      }
      return false
    })
  }
  main(list, name)
  return findItem
}
