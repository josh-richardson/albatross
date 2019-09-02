import { combineReducers } from 'redux'

import user from './user'
import apps from './apps'
import search from './search'

export default combineReducers({ user, apps, search })
