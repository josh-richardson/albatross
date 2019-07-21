import { combineReducers } from "redux";

import user from "./user";
import apps from "./apps";

export default combineReducers({ user, apps });
