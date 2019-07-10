const arweave = Arweave.init({
    host: (window.location.host.indexOf("localhost") !== -1 ? 'arweave.net' : window.location.host),
    port: 443,
    protocol: 'https'
});
