import * as dashboardAPI from 'aliasAPI/rtk-dashboard';
import {
  SAVE_WIDGETS_LIST,
  SET_FILTERS,
  SET_PERSON,
  CHANGE_PERSON_CARD_STATE,
  SET_MRF_LIST
} from 'aliasConstants';
import find from 'lodash/find'

const saveWidgetsList = (payload) => ({
  type: SAVE_WIDGETS_LIST,
  payload
});

const setFilters = (payload) => ({
  type: SET_FILTERS,
  payload
});

const setPerson = (payload) => ({
  type: SET_PERSON,
  payload
});

const isPersonCardOpen = (payload) => ({
  type: CHANGE_PERSON_CARD_STATE,
  payload
});

const actionSetMRFList = (payload) => ({
  type: SET_MRF_LIST,
  payload
});

/**
 * @return {Function}
 */

export function setMRFList() {
  return async (dispatch) => {
    try {
      const response = await dashboardAPI.getMRFList();
      dispatch(actionSetMRFList(response.data));
      dispatch(setFilters({mrf: response.data[0].id}));
    } catch (error) {
      console.info('Action: setMRFList error', error.message || error);
    }
  }
}

export function setWidgets(type, filters = {}) {
  return async (dispatch) => {
    try {
      const response = await dashboardAPI.getWidgets(type, filters);
      dispatch(saveWidgetsList(response.map((item) => {return item.data})));
      dispatch(setFilters(filters));
    } catch (error) {
      console.info('Action: setWidgets error', error.message || error);
    }
  }
}

export function setFiltersData(filters) {
  return async (dispatch) => {
    try {
      dispatch(setFilters(filters));
    } catch (error) {
      console.info('Action: setFiltersData error', error.message || error);
    }
  }
}

export function getPersonById(id) {
  return async (dispatch) => {
    try {
      const response = await dashboardAPI.getPerson(id);
      console.log('getPersonById', response);
      if (!response.data) {
        throw new Error('error status getPersonById');
      }

      const PERSON = find(response.data, (o) => {
        return o.id === id;
      });

      dispatch(setPerson(PERSON));
    } catch (error) {
      console.info('Action: getPersonById error', error.message || error);
    }
  }
}

export function changePersonCardState(state) {
  return async (dispatch) => {
    try {
      dispatch(isPersonCardOpen(state));
    } catch (error) {
      console.info('Action: changePersonCardState error', error.message || error);
    }
  }
}