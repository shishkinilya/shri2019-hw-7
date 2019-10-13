import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { RepositoryState } from 'store/repository/types';
import { ReposState } from 'store/repos/types';
import { AppState } from 'store/types';

import './breadcrumbs.scss';

interface BreadcrumbsProps {
  repos: ReposState;
  repository: RepositoryState;
  className: string;
}

class Breadcrumbs extends React.Component<BreadcrumbsProps> {
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

const mapStateToProps = (state: AppState) => {
  const { repository, repos } = state;
  return { repository, repos };
};

export default connect(
  mapStateToProps,
)(Breadcrumbs);
