import React, {Component} from 'react';
import ReactSVG from 'react-svg';
// import PropTypes from 'prop-types';
import {indicatorColors} from 'aliasCustomer/constants';
import OverlapBars from 'aliasCustomer/components/OverlapBars';
import map from './map.svg';
import './map.scss';
import shortid from "shortid";

class MapMRF extends Component {
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
      components: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return {
        data: nextProps
      };
    }
  }

  mrfColors(svg) {
    const {value} = this.state.data;
    for (let i = 0; i < value.length; i++) {
      let mrf = svg.querySelector(`#${value[i].mrfId}`);
      mrf.setAttribute('fill', indicatorColors[value[i].tmp]);
    }
  }

  renderDashboards() {
    const {value} = this.state.data;

    return value.map((widget) => {
      return <OverlapBars key={shortid.generate()} {...widget} />;
    })
  }

  render() {
    const components = this.renderDashboards();

    return (
      <>
        <div className={'dashboard dashboard_map'}>
          <ReactSVG
            src={map}
            fallback={() => <span>Ошибка загрузки карты</span>}
            loading={() => <span>Закрузка</span>}
            onInjected={(error, svg) => {
              if (error) {
                console.error(error);
                return;
              }
              this.mrfColors(svg);
            }}
            renumerateIRIElements={false}
            svgClassName={'graph-svg'}
            // svgStyle={{ width: 200 }}
            wrapper={'div'}
            className={'map-mrf-wrap'}
            onClick={() => {
              console.log('wrapper onClick')
            }}
          />
        </div>
        {components.length ? components.map((component) => {
          return component
        }) : null}
      </>
    );
  }
}

export default MapMRF;
