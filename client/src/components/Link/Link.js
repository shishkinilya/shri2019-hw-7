import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import './link.scss';

export default function Link(props) {
  const target = props.target ? { target: props.target } : {};
  const isExternal = /^https?/.test(props.to);

  return isExternal
    ? <a className="Link" href={props.to} {...target}>{props.children}</a>
    : <ReactRouterLink className="Link" to={props.to} {...target}>{props.children}</ReactRouterLink>
}
