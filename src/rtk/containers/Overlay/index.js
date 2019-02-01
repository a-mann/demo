import React, { Component } from 'react';
import './overlay.scss'

export default class Overlay extends Component {
  render() {
    return (
      <div className="fixed-overlay">
        {this.props.children}
      </div>
    )
  }
}
