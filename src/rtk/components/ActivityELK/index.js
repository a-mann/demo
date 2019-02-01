import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import './activity-elk.scss';
import moment from 'moment';
import {makeDateStringFromMonthYear, calcPercents, getColumnsMaxData} from 'aliasCustomer/func';

moment.updateLocale('ru', {
  monthsShort: 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_')
});

class ActivityELK extends Component {
  // static propTypes = {
  //   componentData: PropTypes.object.isRequired
  // };
  //
  // static defaultProps = {
  //   componentData: {}
  // };

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      groups: {},
      renderGraph: []
    };

    this.graphCanvas = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return {
        data: nextProps,
        groups: ActivityELK.makeGroupsByYear(nextProps.values)
      };
    }
  }

  static makeGroupsByYear(data) {
    let prepared = {};
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let year = moment(makeDateStringFromMonthYear(item.date)).format('YYYY');
      if (prepared.hasOwnProperty(year)) {
        prepared[year].push(item);
      } else {
        prepared[year] = [];
        prepared[year].push(item);
      }
    }
    return prepared;
  }

  calcColumnWidth = (barsNum, containerWidth, barMargin = 1) => {
    return Math.round(containerWidth / barsNum) - barMargin;
  };

  componentDidMount() {
    this.setState({
      renderGraph: this.renderGraph()
    });
  }

  renderGraph() {
    const {data, groups} = this.state;
    const canvas = this.graphCanvas.current;
    let max = getColumnsMaxData(data.values);
    let barSize = this.calcColumnWidth(data.values.length, canvas.getBoundingClientRect().width);
    let render = [];

    Object.keys(groups).map((key) => {
      return render.push(
        <div key={`period-${key}`} className={'activity-period'}>
          <div className={'activity-period__graph'}>
            {groups[key].map((bar, i) => {
              return (
                <div key={`bar-${i}`} className={'graph-bar'} style={{width: `${barSize}px`}}>
                  <div className={'graph-bar__bar'} style={
                    {height: `${calcPercents(bar.value, max)}%`}
                  }/>
                  <div className={'graph-bar__label'}>{moment(makeDateStringFromMonthYear(bar.date)).format('MMM')}</div>
                </div>
              )
            })}
          </div>
          <div className={'activity-period__label'}>{key}</div>
        </div>
      )
    });
    return render;
  }

  render() {
    const {name} = this.state.data;

    return (
      <div className={'dashboard dashboard_activity'}>
        <h3 className="dashboard__title">{name}</h3>
        <div className={'activity-graph'}>
          <div className={'graph-canvas activity-elk'} ref={this.graphCanvas}>
            {this.state.renderGraph.map((item) => {
              return item;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityELK;
