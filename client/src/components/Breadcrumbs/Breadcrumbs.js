import React from 'react';

import './breadcrumbs.scss';

export default function Breadcrumbs(props) {
  return (
    <ul className={`Breadcrumbs ${props.className}`}>
      <li className="Breadcrumbs-Item"><a href="#" className="Breadcrumbs-Link">arcadia</a></li>
      <li className="Breadcrumbs-Item"><a href="#" className="Breadcrumbs-Link">trunk</a></li>
      <li className="Breadcrumbs-Item"><a href="#" className="Breadcrumbs-Link">arcadia</a></li>
      <li className="Breadcrumbs-Item"><span className="Breadcrumbs-Current">arcanum</span></li>
    </ul>
  )
}
