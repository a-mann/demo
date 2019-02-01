import React, {Suspense, Component} from 'react';
import {PropTypes} from 'prop-types';
import shortid from 'shortid';
import * as Views from 'aliasCustomer/views';

class DynamicLoader extends Component {
  static propTypes = {
    componentName: PropTypes.string.isRequired,
    componentProps: PropTypes.object
  };

  render() {
    const {componentName, componentProps} = this.props;
    const Empty = () => <div>This component does not exist.</div>;
    const dynamicComponent = (() => {
      const WidgetComponent = Views[`${componentName}`]
        ? Views[`${componentName}`]
        : Empty;
      return <WidgetComponent key={shortid.generate()} {...componentProps} />;
    })();
    return (
      <>
        <Suspense fallback={<div>Загрузка…</div>}>{dynamicComponent}</Suspense>
      </>
    );
  }
}

export default DynamicLoader;