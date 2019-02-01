import React, {Component} from 'react';
import Select from 'react-select';
import * as SelectComponents from '../components'
import * as Defaults from '../defaults'
import '../select.scss';
import icoArrow from "../ico-arrow.svg";
import PropTypes from "prop-types";
import findIndex from 'lodash/findIndex';

export default class SelectControlWithNav extends Component {
  static propTypes = {
    options: PropTypes.array,
    handleChange: PropTypes.func,
    filter: PropTypes.string
  };

  static defaultProps = {
    options: [],
    handleChange: () => {},
    filter: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedOption: props.options[0],
      options: props.options
    };

    this.optionsNum = props.options.length;
  }

  handleChange = (selectedOption) => {
    this.setState({selectedOption: selectedOption}, () => {
      this.props.handleChange(selectedOption, this.props.filter);
    });
  };

  handleNav = (dir) => {
    let {selectedOption, options} = this.state;
    let idx = findIndex(options, (o) => {return o.value === selectedOption.value});

    switch (dir) {
      case 'next':
        idx++;
        idx = idx < this.optionsNum ? idx : 0;
        break;
      default:
        idx--;
        idx = idx >= 0 ? idx : this.optionsNum - 1;
        break;
    }
    let option = options[idx];

    this.handleChange(option);
  };

  render() {
    const {selectedOption, options} = this.state;
    const selectProps = Object.assign({}, Defaults.defProps, {className: 'select-control select-control_with-nav select-nav__display'});

    return (
      <div className={'select-nav'}>
        <div className={'select-nav__prev'} onClick={() => {this.handleNav('prev')}}>
          <img className={'ico-arrow'} src={icoArrow} width={'9'} height={'6'} alt="select-nav prev"/>
        </div>
        <Select
          {...selectProps}
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          // defaultMenuIsOpen={true}
          components={
            {
              IndicatorsContainer: SelectComponents.RemoveIndicators
            }
          }
        />
        <div className={'select-nav__next'}  onClick={() => {this.handleNav('next')}}>
          <img className={'ico-arrow'} src={icoArrow} width={'9'} height={'6'} alt="select-nav next"/>
        </div>
      </div>
    )
  }
}