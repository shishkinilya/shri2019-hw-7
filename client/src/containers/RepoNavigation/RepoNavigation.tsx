import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps } from 'react-router-dom';

import fetchRepositoryContent from 'store/repository/fetchRepositoryContent';
import { setCurrentPath } from 'store/repository/actions';
import { AppState } from 'store/types';
import { RepositoryItem, RepositoryState } from 'store/repository/types';

import './files-table.scss';
import { ReactComponent as DirectoryIcon } from './directory.svg';
import { ReactComponent as FileCodeIcon } from './file-code.svg';

interface RepoNavigationProps {
  repository: RepositoryState;
  setCurrentPath: typeof setCurrentPath;
  fetchRepositoryContent: typeof fetchRepositoryContent;
}

class RepoNavigation extends React.Component<RouteComponentProps<Record<string, string>> & RepoNavigationProps> {
  componentDidMount() {
    const { repositoryId, path, branch } = this.props.match.params;

    this.props.setCurrentPath(path);
    this.props.fetchRepositoryContent(repositoryId, branch, path);
  }

  componentDidUpdate(prevProps: RouteComponentProps<Record<string, string>> & RepoNavigationProps) {
    const { path: prevPath } = prevProps.match.params;
    const { repositoryId, path: currentPath } = this.props.match.params;
    const { currentBranch } = this.props.repository;

    if (prevPath !== currentPath) {
      this.props.setCurrentPath(currentPath);
      this.props.fetchRepositoryContent(repositoryId, currentBranch, currentPath);
    }
  }

  getEntityPath(entity: RepositoryItem) {
    return `/${this.props.match.params.repositoryId}/${entity.type}/${this.props.repository.currentBranch}/${entity.name}`;
  }

  render() {
    return (
      <>
        <div className="Tabs">
          <ul className="Tabs-TabList">
            <li className="Tabs-Tab"><a className="Tabs-TabLink Tabs-TabLink_active" href="#">files</a></li>
            <li className="Tabs-Tab"><a className="Tabs-TabLink" href="#">branches</a></li>
          </ul>
        </div>
        <table className="Table Text Text_size_s Text_line-height_m">
          <thead className="Table-Header">
          <tr className="Table-Row Table-Row_border_bottom Table-Row_border_dark">
            <th className="Text Text_weight_normal Text_align_left Text_color_secondary-light Table-Th">Name</th>
            <th className="Text Text_weight_normal Text_align_left Text_color_secondary-light Table-Th">Last commit</th>
            <th className="Text Text_weight_normal Text_align_left Text_color_secondary-light Table-Th">Commit message</th>
            <th className="Text Text_weight_normal Text_align_left Text_color_secondary-light Table-Th">Committer</th>
            <th className="Text Text_weight_normal Text_align_right Text_color_secondary-light Table-Th">Updated</th>
          </tr>
          </thead>
          <tbody id="id-file-list" className="Table-Body">
          {this.props.repository.content.map((entity, index) => (
            <tr key={index} className="Table-Row Table-Row_border_bottom Table-Row_border_light FilesTable-Row">
              <td className="FilesTable-Name">
                <NavLink
                  className="FilesTable-NameLink"
                  to={this.getEntityPath(entity)}
                >
                  <span className="WithIcon WithIcon_gap_md WithIcon_align_center">
                    {entity.type === 'tree' ? (
                      <DirectoryIcon className="WithIcon-Icon WithIcon-Icon_position_left"/>
                    ) : (
                      <FileCodeIcon className="WithIcon-Icon WithIcon-Icon_position_left"/>
                    )}
                    {entity.name.split('/').slice(-1)[0]}
                  </span>
                </NavLink>
              </td>
              <td className="FilesTable-Hash"><a className="link" href="#"></a></td>
              <td className="FilesTable-Message"></td>
              <td className="FilesTable-Author"><span className="username"></span></td>
              <td className="FilesTable-Updated"></td>
              <td className="FilesTable-Arrow">
                <a href="#">
                  <svg width="10" height="19">
                    <use href="../../assets/icons/navigate-arrow.svg"/>
                  </svg>
                </a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const { repository, repos } = state;
  return { repository, repos };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchRepositoryContent,
  setCurrentPath,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoNavigation);
