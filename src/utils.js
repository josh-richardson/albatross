import { arweave } from './constants'

export const retrieveApps = add => {
  return new Promise((resolve, reject) => {
    arweave
      .arql({
        op: 'equals',
        expr1: 'store',
        expr2: 'albatross-v2-beta',
      })
      .then(queryResult => {
        let counter = queryResult.length
        queryResult.forEach(tx => {
          arweave.transactions.get(tx).then(txResult => {
            const txObject = JSON.parse(txResult.get('data', { decode: true, string: true }))
            add(txObject)
            if (--counter === 0) {
              resolve()
            }
          })
        })
      })
  })
}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // eslint-disable-next-line no-mixed-operators
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
