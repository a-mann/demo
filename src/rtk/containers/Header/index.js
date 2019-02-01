import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import icoMenu from './ico-menu.svg';
import {withRouter} from "react-router-dom";

class Header extends Component {
  static propTypes = {
    menuButtons: PropTypes.array,
    user: PropTypes.object,
    notifications: PropTypes.object,
    pathname: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpenSideMenu: false,
    }
  }

  render() {
    return (
      <header className="header">
        <div className="header__wrap">
          {/*<button className="header__btn" onClick={() => {this.props.history.push('/dashboard/mrf')}}>*/}
          <button className="header__btn">
            <img src={icoMenu} alt="Меню" width={'16px'} height={'16px'} />
          </button>
          {/*<h1 className="header__title" onClick={() => {this.props.history.push('/dashboard/main')}}>Мониторинг показателей</h1>*/}
          <h1 className="header__title">Мониторинг показателей</h1>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  // user: state.user,
  // notifications: state.user.notifications,
  // pathname: state.router.location.pathname
});

export default withRouter(connect(
  mapStateToProps,
  null,
)(Header));
