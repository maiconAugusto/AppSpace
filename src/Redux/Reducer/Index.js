import { combineReducers } from 'redux'
import AuthenticReducer from './AuthenticReducer'
import AddContactReducer from './AddContactReducer'
import EditUserContactReducer from './EditUserContactReducer'
import DeleteContactReducer from './DeleteContactReducer'
import SendMessageReducer from './SendMessageReducer';
import ReturnMessageReducer from './ReturnMessageReducer'
import SearcheFriendsReducer from './SearcheFriendsReducer'
import EvalutionReducer from './EvalutionReducer'
import ReturnEvalutionReducer from './ReturnEvalutionReducer'

export default combineReducers({
    AuthenticReducer,
    AddContactReducer,
    EditUserContactReducer,
    DeleteContactReducer,
    SendMessageReducer,
    ReturnMessageReducer,
    SearcheFriendsReducer,
    EvalutionReducer,
    ReturnEvalutionReducer
})