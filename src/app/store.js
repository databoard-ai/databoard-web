import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import eventReducer from '../features/create_event/eventsSlice'
import locationReducer from '../features/create_location/locationSlice'
import registrationReducer from '../features/register/registrationSlice'
import homeReducer from '../features/home/homeSlice'
import tokenExpirationMiddleware from './tokenExpirationMiddleware';
import userProfileSlice from '../features/profile/userProfileSlice'
import eventWaitListTableSlice from '../features/event_waitlist/eventWaitListTableSlice';
import locationWaitListTableSlice from '../features/locationWaitlist/locationWaitListTableSlice';



// Combine all your reducers
const rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  event: eventReducer,
  location: locationReducer,
  home: homeReducer,
  profile: userProfileSlice,
  eventWaitListTable: eventWaitListTableSlice,
  locationWaitListTable: locationWaitListTableSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    tokenExpirationMiddleware,
  ],
});


export default store




