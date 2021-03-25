import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const getPaths = (pathname) => {
  const paths = ['/'];
  if (pathname === '/') return paths;
  pathname.split('/').reduce((prev, curr) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });
  return paths;
};

const BreadcrumbRouteItem = (route, fullCurrPath, home, index, color) => {
  const routes = route.split('/');

  if (route === fullCurrPath) {
    return (
      <li key={index} className={`breadcrumb-item active`}>
        {routes.slice(-1).pop()}
      </li>
    );
  }
  if (route === home) {
    return (
      <li key={index} className={`breadcrumb-item`}>
        <a className={color} href={route}>
          home
        </a>
      </li>
    );
  }
  return (
    <li key={index} className={`breadcrumb-item`}>
      <a className={color} href={route}>
        {routes}
      </a>
    </li>
  );
};

const breadcrumb = (props) => {
  const { className, innerRef, routes, align, color } = props;
  let items = null;
  const router = useRouter();

  const currPath = router.asPath;
  const paths = getPaths(currPath);

  const home = paths[0];
  items = paths.map((route, index) => {
    return BreadcrumbRouteItem(route, currPath, home, index, color);
  });

  return (
    <Fragment>
      <nav aria-label="breadcrumb">
        <ol
          className={`breadcrumb flex mb-0 rounded-0 ${
            align === 'center' ? 'justify-center' : ''
          }`}
          ref={innerRef}
        >
          {items}
        </ol>
      </nav>
    </Fragment>
  );
};

breadcrumb.propTypes = {
  routes: PropTypes.array,
  color: PropTypes.string,
};
breadcrumb.defaultProps = {
  color: 'text-base',
};

export default breadcrumb;
