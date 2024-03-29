import { createReducer, on } from '@ngrx/store';
import * as actions from './reciple.actions';
import { GameHistoric } from '../models/recipes';
import { recipleAvailableLangs } from '../home-screen/home-screen.component';
export interface RecipleState {
  innerHeight: number;
  availableLanguages: Array<string>;
  gameHistoric: GameHistoric;
  settings: RecipleSettings;
}

export interface RecipleSettings {
  isDarkMode: boolean;
  isFirstLogin: boolean;
  isHighContrast: boolean;
  language: string;
}

export const initialState: RecipleState = {
    innerHeight: 0,
    availableLanguages: [],
    gameHistoric: {} as GameHistoric,
    settings: {
      isDarkMode: false,
      isFirstLogin: true,
      isHighContrast: false,
      language: recipleAvailableLangs[0]
    }
};

export const recipleReducer = createReducer(
  initialState,
  on(
    actions.setIsDarkMode,
    (state, {isDarkMode}) => ({...state, settings: {...state.settings, isDarkMode: isDarkMode}})
  ),
  on(
    actions.setGameHistoric,
    (state, {gameHistoric}) => ({...state, gameHistoric: gameHistoric})
  ),
  on(
    actions.setIsHighContrast,
    (state, {isHighContrast}) => ({...state, settings: {...state.settings, isHighContrast: isHighContrast}})
  ),
  on(
    actions.setIsFirstLogin,
    (state, {isFirstLogin}) => ({...state, settings: {...state.settings, isFirstLogin: isFirstLogin}})
  ),
  on(
    actions.setLanguage,
    (state, {language}) => ({...state, settings: {...state.settings, language: language}})
  ),
  on(
    actions.setAvailableLanguages,
    (state, {availableLanguages}) => ({...state, availableLanguages: availableLanguages})
  ),
);