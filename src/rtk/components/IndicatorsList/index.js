import React, {Component, Suspense} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import AnimateOnChange from 'react-animate-on-change';
import {withRouter} from "react-router-dom";
import isEqual from "lodash/isEqual";
import find from "lodash/find";
import * as Views from 'aliasCustomer/views';
import './indicators-list.scss';

class IndicatorsMain extends Component {
  static propTypes = {
    widgets: PropTypes.array.isRequired
  };

  static defaultProps = {
    widgets: []
  };

  constructor(props) {
    super(props);
    this.state = {
      widgets: [],
      components: [],
      animate: null
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.widgets, prevState.widgets)) {
      return {
        widgets: nextProps.widgets,
        animate: true
      };
    }
    return null;
  }

  componentDidMount() {
    this.renderWidgetsList();
  };

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState.widgets, this.state.widgets)) {
      setTimeout(() => {
        this.renderWidgetsList();
      }, 100);

    }
  };

  renderWidgetsList = () => {
    const {widgets, components} = this.state;

    let result = [];
    for (let i = 0; i < widgets.length; i++) {
      let componentName = widgets[i].type;

      // TODO: нужно договориться об именовании типов, пока мап сделаю
      if (!componentName){
        if (widgets[i].values) {
          componentName = widgets[i].values.length > 1 ? 'ActivityELK' : 'OverlapBars';
        }
      }

      let isComponentExist = find(components, (o) => {
        return o.type === componentName;
      });

      if (!isComponentExist && componentName) {
        const Empty = () => <div>Компонент не найден.</div>;
        const WidgetComponent = Views[`${componentName}`]
          ? Views[`${componentName}`]
          : Empty;

        result.push({
          type: componentName,
          component: (
            <Suspense key={shortid.generate()} fallback={<div>Загрузка…</div>}>
              <WidgetComponent {...widgets[i]}/>
            </Suspense>
          )
        });
      }
    }
    if (result.length) {
      this.setState({
        components: result
      })
    }
  };

  render() {
    const {components, animate} = this.state;
    return (
      <AnimateOnChange
        baseClassName="anim-list-on-change"
        animationClassName="is-run"
        animate={animate}
        customTag={'div'}
        onAnimationEnd={() => this.setState({animate: !animate})}
      >
        {components.length ? components.map((component) => {
          return component.component
        }) : null}
      </AnimateOnChange>
    )
  }
}

export default withRouter(IndicatorsMain);