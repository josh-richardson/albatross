import { ALBATROSS_MANIFEST_TAG, arweave } from './constants'

export class api {
  static sendTransaction(data, wallet, tags) {
    return new Promise((resolve, reject) => {
      arweave
        .createTransaction(
          {
            data: data,
          },
          wallet
        )
        .then(pTx => {
          for (let itm in tags) {
            pTx.addTag(itm, tags[itm])
          }
          arweave.transactions
            .sign(pTx, wallet)
            .then(() => {
              arweave.transactions
                .post(pTx)
                .then(pResponse => {
                  if (pResponse.status === 200) {
                    resolve(pResponse, pTx)
                  } else {
                    reject(pResponse)
                  }
                })
                .catch(e => {
                  reject(e)
                })
            })
            .catch(e => {
              reject(e)
            })
        })
    })
  }

  static allOfQuery(query) {
    let results = []
    return new Promise((resolve, reject) => {
      arweave
        .arql(query)
        .then(queryResult => {
          queryResult.forEach(tx => {
            arweave.transactions
              .get(tx)
              .then(txResult => {
                results.push(txResult)
                if (results.length === queryResult.length) {
                  resolve(results)
                }
              })
              .catch(e => {
                reject(e)
              })
          })
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  static retrieveApps(add) {
    return new Promise(resolve => {
      arweave
        .arql({
          op: 'equals',
          expr1: ALBATROSS_MANIFEST_TAG,
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
}
