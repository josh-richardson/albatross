import Arweave from 'arweave/web'
export const VERSION = 2

export const arweave = Arweave.init({
  host: document.location.host.indexOf('localhost') !== -1 ? 'arweave.net' : document.location.host,
  port: 443,
  protocol: 'https',
})

export const appTypes = [
  'accessibility',
  'blogging',
  'developer tools',
  'fun',
  'news & weather',
  'photos',
  'productivity',
  'Shopping',
  'Social',
  'Privacy',
]
