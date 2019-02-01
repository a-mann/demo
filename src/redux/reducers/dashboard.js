import moment from 'moment';
import 'moment/locale/ru';
import {
  SAVE_WIDGETS_LIST,
  SET_FILTERS,
  SET_PERSON,
  CHANGE_PERSON_CARD_STATE,
  SET_MRF_LIST
} from 'aliasConstants';

// TODO: есть сомнения что это правильный подход к созданию initialState - посмотреть решения
const createDatesList = (state = initialState) => {
  moment.locale('ru');

  const availDates = () => {
    const currentDate = moment();
    let result = [];
    for (let i = 0; i < 12; i++) {
      result.push(moment(currentDate).add(i * -1, 'M'));
    }
    return result;
  };

  return availDates().map((item) => {
    return {value: moment(item).format('YYYY-MM'), label: moment(item).format('MMMM YYYY')}
  });


  // const list = state.periodsList.concat(periodsList);
  // console.log(9, list);

};

const initialState = {
  widgets: [],
  mrfList: [],
  periodsList: createDatesList(),
  filters: {
    date: null,
    mrf: null,
    indicator: null
  },
  person: {
    "id": null,
    "indicator": "",
    "mrf": "",
    "name": "",
    "photo": "",
    "contacts": {
      "phone": "",
      "email": "",
      "chat": ""
    }
  },
  isPersonCardOpen: false
};

const setDefaultPeriod = (state = initialState) => {
  return {
    ...state,
    filters: Object.assign(state.filters, {date: state.periodsList[0].value})
  }
};

setDefaultPeriod();

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MRF_LIST: {
      return {
        ...state,
        mrfList: action.payload
      }
    }

    case SAVE_WIDGETS_LIST: {
      return {
        ...state,
        widgets: action.payload
      }
    }

    case SET_FILTERS: {
      return {
        ...state,
        filters: Object.assign(state.filters, action.payload)
      }
    }

    case SET_PERSON: {
      return {
        ...state,
        person: Object.assign(state.person, action.payload)
      }
    }

    case CHANGE_PERSON_CARD_STATE: {
      return {
        ...state,
        isPersonCardOpen: action.payload
      }
    }

    default:
      return state;
  }
}
