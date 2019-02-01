import React, {Component} from 'react';
import PropTypes from "prop-types";

class Input extends Component {
  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      let val = nextProps.value;
      return val ? {value: val} : null;
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value}, () => {
      this.props.onChange(e.target);
    });
  }

  render() {
    const {type, name, label} = this.props;
    const {value} = this.state;
    return (
      <>
        <input
          className={`inp ${value.length ? 'is-filled' : ''}`}
          type={type ? type : 'text'}
          name={name}
          value={value}
          onChange={(e) => {
            e.persist();
            this.handleChange(e)
          }}
        />
        {label ? <label className="lbl" htmlFor={name}>{label}</label> : null}
      </>
    )
  }
}

export default Input;
