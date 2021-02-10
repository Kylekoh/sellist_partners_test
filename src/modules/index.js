import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./CartModule";
import cartDataReducer from "./CartDataModule";
import buyCreditReducer from "./BuyDataModule";
import sponsorStartDateReducer from "./SponsorStartDateModule";
import sponsorEndDateReducer from "./SponsorEndDateModule";
import { controlModalReducer } from "./CreatEventModalModule";
import { accessTokenReducer, emailReducer } from "./LoginModule";
import {
  usernameReducer,
  eventnameReducer,
  eventurlReducer,
  shoppingurlReducer,
  originalpriceReducer,
  newpriceReducer,
  notenoughReducer,
  eventimgReducer,
  eventcategoryReducer,
  profileimgReducer,
  durationStartReducer,
  durationEndReducer
} from "./UserInputModule";
import { nextReducer, toggleReducer } from "./TooltipModule";
import {
  upcomingReducer,
  ongoingReducer,
  pastReducer,
  deleteReducer,
  confirmDeleteReducer,
  permlinkReducer
} from "./EventModule";
import { checkModalReducer } from "./CheckModalModule";

import checkPointReducer from "./PointCheckModule";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["accessTokenReducer", "emailReducer", "cartDataReducer"]
};

const rootReducer = combineReducers({
  sponsorStartDateReducer,
  sponsorEndDateReducer,
  usernameReducer,
  eventnameReducer,
  eventurlReducer,
  shoppingurlReducer,
  originalpriceReducer,
  newpriceReducer,
  notenoughReducer,
  eventcategoryReducer,
  profileimgReducer,
  eventimgReducer,
  cartReducer,
  cartDataReducer,
  buyCreditReducer,
  accessTokenReducer,
  emailReducer,
  controlModalReducer,
  durationStartReducer,
  durationEndReducer,
  nextReducer,
  toggleReducer,
  upcomingReducer,
  ongoingReducer,
  pastReducer,
  deleteReducer,
  confirmDeleteReducer,
  permlinkReducer,
  checkModalReducer,
  checkPointReducer
});

export default persistReducer(persistConfig, rootReducer);
