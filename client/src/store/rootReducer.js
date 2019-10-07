import { combineReducers } from 'redux';

import repos from './repos/reducer';
import repository from './repository/reducer';
import blob from './blob/reducer';

export default combineReducers({
  repos,
  repository,
  blob,
})

