import Arweave from 'arweave/web'
import React from 'react'

export const VERSION = 3

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
const isDev = '_self' in React.createElement('div')

export const ALBATROSS_APP_PKG_TAG = 'packageId'
export const ALBATROSS_REVIEW_TAG = 'albatross-review-beta-v3'
export const ALBATROSS_MANIFEST_TAG = 'store'
export const ALBATROSS_RELEASE_TAG = 'albatross-release'
export const ALBATROSS_UPDATE_TAG = isDev ? 'albatross-update-dev1' : 'albatross-update-v1'

export const isFirefox = typeof InstallTrigger !== 'undefined'
// eslint-disable-next-line no-undef
export const isBlink = !!window.chrome
