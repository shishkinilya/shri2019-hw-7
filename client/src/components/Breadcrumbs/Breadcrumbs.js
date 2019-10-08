import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './breadcrumbs.scss';

class Breadcrumbs extends React.Component {
  render() {
    const { currentPath } = this.props.repository;

    return (
      <ul className={`Breadcrumbs ${this.props.className}`}>
        {currentPath
          ? <li className="Breadcrumbs-Item">
            <NavLink
              to={`/${this.props.repos.currentRepository}`}
              className="Breadcrumbs-Link"
            >
              {this.props.repos.currentRepository}
            </NavLink>
          </li>
          : <li className="Breadcrumbs-Item"><span className="Breadcrumbs-Current">{this.props.repos.currentRepository}</span></li>
        }

        {currentPath && currentPath.split('/').map((part, index, arr) => {
          return index < arr.length - 1
            ? <li key={index} className="Breadcrumbs-Item">
                <NavLink
                  to={`/${this.props.repos.currentRepository}/tree/${this.props.repository.currentBranch}/${arr.slice(0, index + 1).join('/')}`}
                  className="Breadcrumbs-Link">{part}
                </NavLink>
              </li>
            : <li key={index} className="Breadcrumbs-Item"><span className="Breadcrumbs-Current">{part}</span></li>
        })}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  const { repository, repos } = state;
  return { repository, repos };
};

export default connect(
  mapStateToProps,
)(Breadcrumbs);
