import React, {Component} from 'react';
import {MemoryRouter} from 'react-router'
import {connect} from "react-redux";
import SignIn from 'aliasCustomer/components/SignIn';
import Dashboard from 'aliasCustomer/containers/Dashboard';
import Overlay from 'aliasCustomer/containers/Overlay';
import IndicatorPerson from 'aliasCustomer/components/IndicatorPerson'
import 'aliasAssets/scss/all.scss'
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import {CookiesProvider, withCookies} from 'react-cookie';

class PageLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPersonCardOpen: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return {
        isPersonCardOpen: nextProps.isPersonCardOpen
      };
    }
  }

  render() {
    const {isPersonCardOpen} = this.state;
    const {cookies} = this.props;
    // TODO: прикрутить анимацию переходов в роутере
    return (
      <>
        <CookiesProvider>
          <div className="page-wrap">
            <MemoryRouter>
              <Switch>
                <Route path={'/'} render={() => {
                  return cookies.get('auth') ?
                    <Redirect to='/dashboard/main'/> :
                    <Redirect to={'/sign-in'}/>}} exact/>
                <Route path={'/dashboard/:type'} component={Dashboard} />
                <Route path={'/sign-in'} component={SignIn}/>
              </Switch>
            </MemoryRouter>
          </div>
          {isPersonCardOpen ? <Overlay children={<IndicatorPerson/>}/> : null}
        </CookiesProvider>
      </>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isPersonCardOpen: state.dashboard.isPersonCardOpen
});

export default withRouter(connect(mapStateToProps)(withCookies(PageLayout)))
