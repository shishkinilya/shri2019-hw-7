import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import './link.scss';

interface LinkProps {
  target: string;
  to: string;
  children: React.ReactNode;
}

export default function Link(props: LinkProps) {
  const target = props.target ? { target: props.target } : {};
  const isExternal = /^https?/.test(props.to);

  return isExternal
    ? <a className="Link" href={props.to} {...target}>{props.children}</a>
    : <ReactRouterLink className="Link" to={props.to} {...target}>{props.children}</ReactRouterLink>
}
