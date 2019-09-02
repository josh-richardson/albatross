import { combineReducers } from 'redux'

import apps from './apps'
import search from './search'
import user from './user'

export default combineReducers({ user, apps, search })
