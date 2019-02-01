import React, {Component} from "react";
import DynamicLoader from 'aliasCustomer/components/DynamicLoader';
// import isEqual from 'lodash/isEqual';
import moment from 'moment';
import 'moment/locale/ru';
import {connect} from 'react-redux';
import {setMRFList} from 'aliasRedux/actions/dashboard';
// import {SET_FILTERS} from 'aliasConstants';
import shortid from "shortid";
import './filter.scss'
import PropTypes from "prop-types";

moment.locale('ru');

class IndicatorFilter extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    setMRFList: PropTypes.func.isRequired,
    mrfList: PropTypes.array.isRequired,
    periodsList: PropTypes.array.isRequired
  };

  static defaultProps = {
    path: 'main',
    setMRFList: () => {},
    mrfList: [],
    periodsList: []
  };

  constructor(props) {
    super(props);

    this.state = {
      mrfList: [],
      periodsList: []
    };

    this.indicatorsList = [
      {value: '1', label: 'NPS ЕЛК'},
      {value: '2', label: 'CSI ЕЛК'},
      {value: 'ДВ', label: 'ДВ'},
      {value: 'Москва', label: 'Москва'},
      {value: 'СЗ', label: 'СЗ'},
      {value: 'Сибирь', label: 'Сибирь'},
      {value: 'Урал', label: 'Урал'},
      {value: 'Центр', label: 'Центр'},
      {value: 'Юг', label: 'Юг'}
    ];

    this.filterSettingsByPath = {
      'main': [
        {
          component: 'SelectControlWithNav',
          filter: 'date'
        },
        {
          component: 'SelectControl',
          filter: 'mrf'
        }
      ],
      'mrf': [
        {
          component: 'SelectControlWithNav',
          filter: 'date'
        },
        {
          component: 'SelectControl',
          filter: 'mrf'
        }
      ]
    }
  }

  componentDidMount() {
    const {setMRFList, periodsList} = this.props;
    setMRFList().then(() => {
      this.setState({mrfList: this.props.mrfList});
    });
    this.setState({periodsList: periodsList});
  }

  // shouldComponentUpdate(nextProps) {
  //   return !isEqual(this.props, nextProps)
  // }

  renderFilters() {
    const {path} = this.props;
    const settings = this.filterSettingsByPath[path];

    const getOptions = (type) => {
      let options;
      switch (type) {
        case 'mrf':
          options = this.state.mrfList.map((item) => {
            return {value: item.id, label: item.name}
          });
          break;
        case 'date':
          options = this.state.periodsList;
          break;
        default:
      }
      return options;
    };

    return settings.map((filter) => {
      return (
        <div key={shortid.generate()} className="filter__item">
          <DynamicLoader
            componentName={filter.component}
            componentProps={{
              options: getOptions(filter.filter),
              filter: filter.filter,
              handleChange: this.props.onChange
            }}/>
        </div>
      )
    })
  }

  render() {
    let filters = this.renderFilters();

    return (
      <>
        <section className="filter">
          {filters.length ? filters.map((filter) => {
            return filter;
          }) : null}
        </section>
      </>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return({
//     setMRFFilter: () => {dispatch(SET_FILTERS)}
//   })
// }

const mapStateToProps = (state, props) => ({
  mrfList: state.dashboard.mrfList,
  periodsList: state.dashboard.periodsList
});

export default connect(
  mapStateToProps,
  {setMRFList: setMRFList}
)(IndicatorFilter);