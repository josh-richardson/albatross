
import Arweave from "arweave/web";

export const VISIBILITY_FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete"
};


export const arweave = Arweave.init({
  host:
    document.location.host.indexOf("localhost") !== -1
      ? "arweave.net"
      : document.location.host,
  port: 443,
  protocol: "https"
});
