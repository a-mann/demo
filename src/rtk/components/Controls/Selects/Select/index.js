import React, {Component} from 'react';
import Select from 'react-select';
import * as SelectComponents from '../components'
import * as Defaults from '../defaults'
import '../select.scss';
import PropTypes from "prop-types";

export default class SelectControl extends Component {
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
  }

  handleChange = (selectedOption) => {
    this.setState({selectedOption}, () => {
      this.props.handleChange(selectedOption, this.props.filter);
    });
  };

  render() {
    const {selectedOption, options} = this.state;

    return (
      <Select
        {...Defaults.defProps}
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        isDisabled={options.length <= 1}
        // defaultMenuIsOpen={true}
        components={
          {
            DropdownIndicator: SelectComponents.DropdownIndicator,
            IndicatorSeparator: SelectComponents.IndicatorSeparator
          }
        }
      />
    )
  }
}