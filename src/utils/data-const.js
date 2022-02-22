function findData(list, value, valueKey) {
  return ![undefined, null].includes(value) ? list.find(item => item[valueKey || 'value'] === value) || {} : list
}

export function projectTypeStatus(code) {
  const list = [
    {
      value: 1,
      text: 'Filecoin'
    }, {
      value: 2,
      text: 'ETH'
    }, {
      value: 3,
      text: 'BTC'
    }
  ]
  return findData(list, code)
}

export function runStatus(code) {
  const list = [
    {
      value: false,
      text: '正常',
      type: 'success'
    }, {
      value: true,
      text: '删除',
      type: 'danger'
    }
  ]
  return findData(list, code)
}

export function availableStatus(code) {
  const list = [
    {
      value: 1,
      text: '启用',
      type: 'success'
    }, {
      value: 2,
      text: '禁用',
      type: 'danger'
    }
  ]
  return findData(list, code)
}
