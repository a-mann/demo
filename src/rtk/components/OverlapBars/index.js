import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {getPersonById,changePersonCardState} from 'aliasRedux/actions/dashboard';
import shortid from 'shortid';
import './overlap-bars.scss'
import {calcPercents} from 'aliasCustomer/func';
import {indicatorColors} from 'aliasCustomer/constants';
import icoPerson from 'aliasAssets/img/ico-person.svg';
import Swipeable from 'react-swipeable';
import {connect} from "react-redux";

class OverlapBars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isSwiped: false
    };

    this.overlap = {
      value: 50,
      color: 'rgba(100,56,230,.8)'
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      let value = Array.isArray(nextProps.values) ? nextProps.values[0] : nextProps; //TODO: кода опрделится что возвращает API переделать для единообразия

      return {
        data: value,
        indicatorColor: indicatorColors[value.score],
        targetValue: value.targetValue,
        factValue: value.value
      };
    }
  }

  calcColumnWidth = (colsNum, overlap = 0) => {
    let colWidth = 100 / colsNum;
    if (overlap) {
      colWidth = colWidth + overlap / colsNum;
    }
    return colWidth;
  };

  renderRect(attrs) {
    let attr = {};
    attrs.map((item) => {
      return attr[item.name] = item.unit ? `${item.val}${item.unit}` : String(item.val);
    });
    return <rect key={shortid.generate()} {...attr} />
  };

  makeOverlapCol = (overlap, height) => {
    let attrs = [
      {
        name: 'width',
        val: overlap.value,
        unit: '%'
      },
      {
        name: 'height',
        val: height,
        unit: '%'
      },
      {
        name: 'fill',
        val: overlap.color
      },
      {
        name: 'x',
        val: 50 - overlap.value / 2,
        unit: '%'
      },
      {
        name: 'y',
        val: 100 - height,
        unit: '%'
      }
    ];

    return this.renderRect(attrs);
  };

  makeRects() {
    const {data, indicatorColor, targetValue, factValue} = this.state;
    let barValues = [targetValue, factValue];
    let max = Math.max(...barValues);
    let min = Math.min(...barValues);
    let colMinHeight = calcPercents(min, max);
    let colWidth = this.calcColumnWidth(barValues.length, this.overlap.value);

    let bars = barValues.map((bar, i) => {
      let itemHeight = calcPercents(bar, max);
      let colXPos = colWidth * i;

      if (this.overlap) {
        colXPos = i > 0 ? colXPos - this.overlap.value / i : 0;
      }

      let attrs = [
        {
          name: 'width',
          val: colWidth,
          unit: '%'
        },
        {
          name: 'height',
          val: itemHeight,
          unit: '%'
        },
        {
          name: 'fill',
          val: bar !== targetValue ? indicatorColor : indicatorColors.indicatorFact
        },
        {
          name: 'x',
          val: colXPos,
          unit: '%'
        },
        {
          name: 'y',
          val: 100 - itemHeight,
          unit: '%'
        }
      ];

      return this.renderRect(attrs);
    });

    if (this.overlap) {
      let curOverlap = Object.assign(this.overlap, {color: indicatorColors[data.score + 'Overlap']});
      bars.push(this.makeOverlapCol(curOverlap, colMinHeight))
    }

    return bars;
  }

  onSwiped(dir) {
    this.setState({isSwiped: dir === 'right'})
  }

  renderIndicator() {
    const {name} = this.props;
    const {indicatorColor, targetValue, factValue} = this.state;
    const targetValueLocale = targetValue.toLocaleString();
    const factValueLocale = factValue.toLocaleString();
    return (
      <div className="dashboard__row">
        <div className="dashboard__col">
          <h3 className="dashboard__title">{name}</h3>
          <span className="dashboard__data" style={{color: indicatorColor}}>{factValueLocale}</span>
          <span className="dashboard__notes">Цель — {targetValueLocale}</span>
        </div>
        <div className="dashboard__col">
          <div className={'dashboard__graph overlap-bars'}>
            <svg className={'graph-svg'} xmlns="http://www.w3.org/2000/svg">
              {this.makeRects().map((rect) => {
                return rect
              })}
            </svg>
          </div>
          <div className="dashboard__indicators">
            <span>{targetValueLocale}</span>
            <span>{factValueLocale}</span>
          </div>
        </div>
      </div>
    )
  }

  renderDashboard() {
    const {isSwiped} = this.state;
    const {personId} = this.props; // есть/нет ответственный, должно приходить из API - id отвественного
    let layout = null;

    if (personId) {
      const {dispatch} = this.props;
      layout = (
        <div className={'dashboard-wrap'}>
          <div className="dashboard-person" onClick={() => {
            dispatch(getPersonById(personId)).then(() => {
              this.setState({isSwiped: false});
              dispatch(changePersonCardState(true));
            })
           }
          }>
            <img src={icoPerson} width={'24'} height={'24'} alt="Показать ответсвенного"/>
          </div>
          <Swipeable
            className={`dashboard ${isSwiped ? 'is-swiped' : ''}`}
            trackMouse={true}
            onSwipingLeft={() => this.onSwiped('left')}
            onSwipingRight={() => this.onSwiped('right')}>
            {this.renderIndicator()}
          </Swipeable>
        </div>
      )
    } else {
      layout = <div className={'dashboard'}>
        {this.renderIndicator()}
      </div>
    }

    return layout;
  }

  render() {
    return (
      <>
        {this.renderDashboard()}
      </>
    );
  }
}

export default connect()(OverlapBars);
