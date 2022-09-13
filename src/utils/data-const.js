function findData(list, value, valueKey) {
  return ![undefined, null].includes(value) ? list.find(item => item[valueKey || 'value'] === value) || {} : list
}
export function projectTypeStatus(code) {
  const list = [
    {
      value: 1,
      text: 'Filecoin',
      sText: 'FIL',
      disable: false
    }, {
      value: 2,
      text: 'ETEthereumH',
      sText: 'ETH',
      disable: false

    },
    // {
    //   value: 3,
    //   text: 'BTC'
    // },
    {
      value: 4,
      text: 'NEAR',
      sText: 'NEAR',
      disable: false

    },
    {
      value: 5,
      text: 'IPFS',
      sText: 'IPFS',
      disable: false
    },
    {
      value: 6,
      text: 'Solana',
      sText: 'SOL',
      disable: true
    }
  ]
  return findData(list, code)
}

export function runStatus(code) {
  const list = [
    {
      value: false,
      text: 'Normal',
      type: 'success'
    }, {
      value: true,
      text: 'Delete',
      type: 'danger'
    }
  ]
  return findData(list, code)
}

export function availableStatus(code) {
  const list = [
    {
      value: 1,
      text: 'Enable',
      type: 'success'
    }, {
      value: 2,
      text: 'Disabled',
      type: 'danger'
    }
  ]
  return findData(list, code)
}

export const docsHostMap = {
  dev: 'https://dev-ng-docs.storeros.com',
  test: 'https://test-ng-docs.storeros.com',
  prod: 'https://docs.ey-node.com'
}
