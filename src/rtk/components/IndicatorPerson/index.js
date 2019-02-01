import React, {Component} from 'react';
import {connect} from "react-redux";
import {changePersonCardState} from 'aliasRedux/actions/dashboard';
import './person.scss';
import './person-card.scss';
import icoClose from './ico-close.svg';
import icoMail from './ico-mail.svg';
import icoChat from './ico-chat.svg';
import icoPhone from './ico-phone-tube.svg';

class IndicatorPerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return {
        person: nextProps.person
      };
    }
  }

  renderPersonContacts(){
    const {person} = this.state;
    let result = [];

    if (person.contacts) {
      Object.keys(person.contacts).map((key) => {
        if (person.contacts.hasOwnProperty(key)) {
          switch (key) {
            case 'email':
              result.push(
                <a key={key} className="person-card" href={`mailto:${person.contacts[key]}`}>
                  <div className="person-card__icon">
                    <img src={icoMail} width={'24'} height={'24'} alt="почта"/>
                  </div>
                  <div className="person-card__body">
                    <h4 className="person-card__title">{person.contacts[key]}</h4>
                    <p className="person-card__notes">Рабочая почта</p>
                  </div>
                </a>
              );
              break;
            case 'phone':
              result.push(
                <a key={key} className="person-card" href={`tel:${person.contacts[key]}`}>
                  <div className="person-card__icon">
                    <img src={icoPhone} width={'24'} height={'24'} alt="телефон"/>
                  </div>
                  <div className="person-card__body">
                    <h4 className="person-card__title">{person.contacts[key]}</h4>
                    <p className="person-card__notes">Мобильный телефон</p>
                  </div>
                </a>
              );
              break;
            case 'chat':
              result.push(
                <div key={key} className="person-card">
                  <div className="person-card__icon">
                    <img src={icoChat} width={'24'} height={'24'} alt="чат"/>
                  </div>
                  <div className="person-card__body">
                    <h4 className="person-card__title">{person.contacts[key]}</h4>
                    <p className="person-card__notes">Написать в&nbsp;чат</p>
                  </div>
                </div>
              );
              break;
            default:
          }
          return result;
        }
        return result;
      })
    }
    return result;
  }

  render() {
    const {person} = this.state;
    const {dispatch} = this.props;

    return (
      <section className="person is-show">
        <div className="person__header">
          <img className="person__avatar" src={`${process.env.PUBLIC_URL}/static/img/${person.photo}`} alt="alt"/>
          <img
            className={'person__close'}
            src={icoClose}
            width={'24'}
            height={'24'}
            onClick={() => {dispatch(changePersonCardState(false))}}
            alt="Закрыть"/>
          <div className="person__info">
            <h3 className="person__title">{person.name}</h3>
            <p className="person__position">{person.mrf} — {person.indicator}</p>
          </div>
        </div>
        <div className="person__body">
          {this.renderPersonContacts().map((contact) => {return contact;})}
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state, props) => ({
  person: state.dashboard.person
});

export default connect(mapStateToProps)(IndicatorPerson)
