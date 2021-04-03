import {combineReducers} from 'redux';
import {filmItems} from './films';
import {filmViewer} from "./film-viewer";

export default combineReducers({filmItems, filmViewer});