import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RecipleState } from "./reciple.reducer";


export const selectFeature = createFeatureSelector<RecipleState>('reciple');
export const selectSettings = createSelector(selectFeature, (state: RecipleState) => state.settings);
export const selectIsDarkMode = createSelector(selectFeature, (state: RecipleState) => state.settings.isDarkMode);
