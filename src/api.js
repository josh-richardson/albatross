import { arweave } from './constants'

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
}
