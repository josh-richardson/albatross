import {
  ALBATROSS_APP_PKG_TAG,
  ALBATROSS_MANIFEST_TAG,
  ALBATROSS_RELEASE_TAG,
  ALBATROSS_REVIEW_TAG,
  ALBATROSS_UPDATE_TAG,
  arweave,
} from './constants'
import { DEBUG } from './constants_dev'

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
      this.allOfQuery({
        op: 'equals',
        expr1: ALBATROSS_MANIFEST_TAG,
        expr2: 'albatross-v2-beta',
      }).then(results => {
        for (let i = 0; i < results.length; i++) {
          add(JSON.parse(results[i].get('data', { decode: true, string: true })))
        }
        resolve()
      })
    })
  }

  static retrieveAppReviewsByUser(app, userAddress, processResult) {
    api
      .allOfQuery({
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: ALBATROSS_REVIEW_TAG,
          expr2: app.id,
        },
        expr2: {
          op: 'equals',
          expr1: 'from',
          expr2: userAddress,
        },
      })
      .then(results => {
        results.forEach(txResult => {
          processResult(txResult)
        })
      })
  }

  static retrieveAppReviews(appId, processResult) {
    api
      .allOfQuery({
        op: 'equals',
        expr1: ALBATROSS_REVIEW_TAG,
        expr2: appId,
      })
      .then(queryResult => {
        queryResult.forEach(txResult => {
          processResult(txResult)
        })
      })
  }

  static retrieveAppUpdates(appId, authorAddr, processResult) {
    api
      .allOfQuery({
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: ALBATROSS_UPDATE_TAG,
          expr2: appId,
        },
        expr2: {
          op: 'equals',
          expr1: 'from',
          expr2: authorAddr,
        },
      })
      .then(result => {
        result.forEach(txResult => {
          processResult(txResult)
        })
      })
  }

  static retrieveApplicationPackageTransactions(artifactId, authorAddr, processResult) {
    arweave
      .arql({
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: ALBATROSS_APP_PKG_TAG,
          expr2: artifactId,
        },
        expr2: {
          op: 'equals',
          expr1: 'from',
          expr2: authorAddr,
        },
      })
      .then(queryResult => {
        processResult(queryResult)
      })
  }

  static checkForNewerAlbatross(processResult) {
    api
      .allOfQuery({
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: 'from',
          expr2: 'tIf0wLp418uknaNKxi-GVUM-1Xh7jPyAfISoBozpICU',
        },
        expr2: {
          op: 'equals',
          expr1: ALBATROSS_RELEASE_TAG,
          expr2: DEBUG ? 'beta' : 'production',
        },
      })
      .then(queryResult => {
        queryResult.forEach(txResult => {
          processResult(txResult)
        })
      })
  }
}
