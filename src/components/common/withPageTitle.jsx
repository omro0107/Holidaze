import React from 'react';
import usePageTitle from '../../hooks/usePageTitle';

/**
 * Higher-order component that adds page title functionality to a component
 * @param {React.ComponentType} WrappedComponent - The component to wrap
 * @param {string} title - The title to set for the page
 */
const withPageTitle = (WrappedComponent, title) => {
  return function WithPageTitleComponent(props) {
    usePageTitle(title);
    return <WrappedComponent {...props} />;
  };
};

export default withPageTitle;
