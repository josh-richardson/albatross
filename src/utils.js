import { arweave } from "./constants";

export const retrieveApps = add => {
  return new Promise((resolve, reject) => {
    arweave
      .arql({
        op: "equals",
        expr1: "store",
        expr2: "albatross-v2-beta"
      })
      .then(queryResult => {
        let counter = queryResult.length;
        queryResult.forEach(tx => {
          arweave.transactions.get(tx).then(txResult => {
            const txObject = JSON.parse(
              txResult.get("data", { decode: true, string: true })
            );
            add(txObject);
            if (--counter === 0) {
              resolve();
            }
          });
        });
      });
  });
};
