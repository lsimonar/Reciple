import { createAction, props } from '@ngrx/store';
import { GameHistoric } from '../models/recipes';

export const setIsDarkMode = createAction('[Reciple] Set isDarkMode', props<{isDarkMode: boolean}>());
export const setGameHistoric = createAction('[Reciple] Set game historic', props<{gameHistoric: GameHistoric}>());

