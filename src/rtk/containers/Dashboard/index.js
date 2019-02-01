import {connect} from 'react-redux';
import Header from 'aliasCustomer/containers/Header';
import IndicatorsMain from 'aliasCustomer/components/IndicatorsList';
import IndicatorFilter from 'aliasCustomer/containers/IndicatorFilter';
import {
  setWidgets,
  setFiltersData
} from 'aliasRedux/actions/dashboard';
import {withRouter} from "react-router-dom";
import React, {Component} from "react";
import PropTypes from "prop-types";
import isEqual from 'lodash/isEqual';

// TODO: сохранять выбранный экран - основной, по мрф - в state Dashboard - в параметрах роутера/или просто парметром?
// TODO: запрос нового набора виджетов при переходе к МРФ
// TODO: возможно стоит сохранять полученные данные для виджетов чтоб не дергать сервер каждый раз

class Dashboard extends Component {
  static propTypes = {
    setWidgets: PropTypes.func,
    filters: PropTypes.object
  };

  static defaultProps = {
    filters: {
      date: null,
      mrf: null,
      indicator: null
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dashboardType: props.match.params.type,
      filters: {
        date: null,
        mrf: null,
        indicator: null
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return {
        filters: Object.assign(prevState.filters, nextProps.filters)
      };
    }
  }

  componentDidMount() {
    console.log('mount Dashboard: ', this.props.match.params.type);
    this.updateData();
  };

  componentDidUpdate(prevProps, prevState){
    if (this.props.match.params.type !== prevState.dashboardType) {
    // if (this.props !== prevProps) {
      console.log('update Dashboard: ', this.props.match.params.type, prevState.dashboardType);
      this.updateData();
    }
  };

  makeFilters(){
    const {filters} = this.state;
    let activeFilters = {};
    for (let key in filters) {
      if (filters.hasOwnProperty(key)) {
        if (filters[key]) {
          activeFilters[key] = filters[key];
        }
      }
    }
    return activeFilters;
  }

  updateData(){
    // const {filters} = this.state;
    const {type} = this.props.match.params;
    const {setWidgets} = this.props;
    const activeFilters = this.makeFilters();
    this.setState({dashboardType: type}, () => {
      setWidgets(type, activeFilters).then(() => {
        this.setState({
          data: this.props.data
        })
      }).catch((error) => {
        console.info('Dashboard - API return no data', error.message || error);
      });
    });
  }

  handleFiltersChange = (selectedOption, filter) => {
    let setFilter = {};
    setFilter[filter] = selectedOption.value;
    this.handleFilters(setFilter);
  };

  handleFilters(selectedFilter) {
    this.props.setFiltersData(selectedFilter).then(() => {
      const {filters} = this.props.data;

      if (!isEqual(filters, this.state.filters)) {
        this.setState({filters: Object.assign(this.state.filters, selectedFilter)}, () => {
          this.updateData();
        });

        // let activeFilters = {};
        // for (let key in filters) {
        //   if (filters.hasOwnProperty(key)) {
        //     if (filters[key]) {
        //       activeFilters[key] = filters[key];
        //     }
        //   }
        // }

        // this.props.getWidgets(activeFilters).then(() => {
        //   this.setState({
        //     data: this.props.data.dashboard.widgets
        //   })
        // }).catch((error) => {
        //   console.info('Dashboard - get data with filters error', error.message || error);
        // });
      }
    }).catch((error) => {
      console.info('Dashboard - get data error', error.message || error);
    });
  }

  render() {
    const {data} = this.state;

    if (!data.length) {
      return null;
    }

    return (
      <>
        <Header/>
        <main className="main-board">
          <IndicatorFilter onChange={this.handleFiltersChange} path={this.props.match.params.type}/>
          <IndicatorsMain widgets={data}/>
        </main>
      </>
    )
  }
}

const mapStateToProps = (state, props) => ({
  data: state.dashboard.widgets,
  filters: state.dashboard.filters
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      setWidgets: setWidgets,
      setFiltersData: setFiltersData
    }
    )(Dashboard)
);