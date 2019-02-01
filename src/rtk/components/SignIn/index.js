import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {auth} from 'aliasRedux/actions/auth';
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';
import Input from 'aliasCustomer/components/Controls/Input';
import './sign-in.scss';
import logo from './rt-logo.svg';
import filter from 'lodash/filter'

class SignIn extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies)
  };

  constructor(props) {
    super(props);

    this.state = {
      user: {
        login: '',
        pass: ''
      }
    }
  }

  handleChange(e) {
    const {user} = this.state;
    let val = {};
    val[e.name] = e.value;
    this.setState({user: Object.assign(user, val)});
  }

  handleAuth() {
    const {user} = this.state;
    const {auth, cookies} = this.props;
    console.log('auth cookies', cookies);

    let checkEmpty = filter(user, (o) => {
      return !o.length;
    });

    if (checkEmpty.length) {
      console.log('empty', checkEmpty);
    } else {
      auth(user).then(() => {
        if (this.props.isAuth === 'SUCCESS') {
          console.log('is auth');
          cookies.set('auth', true, { path: '/' });
          this.props.history.push('/dashboard/main');
        }
      });
    }
  }

  render() {
    return (
      <section className="auth">
        <div className="auth__wrap">
          <img className="logo" src={logo} width="47" height="78" alt={'Ростелеком - Мониторинг показтелей'}/>
          <h1 className="title">Мониторинг<br/> показателей</h1>
          <form className="form">
            <div className="form__row">
              <Input
                name={'login'}
                onChange={(e) => this.handleChange(e)}
                label={'Имя пользователя'}
              />
            </div>
            <div className="form__row">
              <Input
                name={'pass'}
                type={'password'}
                onChange={(e) => this.handleChange(e)}
                label={'Пароль'}
              />
            </div>
            <div className="form__row">
              <button
                type={'button'}
                onClick={() => this.handleAuth()}
                className="form__btn"
              >Войти
              </button>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {auth: auth})(withCookies(withRouter(SignIn)));