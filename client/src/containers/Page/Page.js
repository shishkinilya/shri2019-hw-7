import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from 'components/Header/Header';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Footer from 'components/Footer/Footer';
import RepoNavigation from 'containers/RepoNavigation/RepoNavigation';
import FileDetail from 'containers/FileDetail/FileDetail';
import fetchRepos from 'store/repos/fetchRepos';
import fetchRepositoryContent from 'store/repository/fetchRepositoryContent';
import Username from 'components/Username/Username';
import { setCurrentRepository } from 'store/repos/actions';

import { ReactComponent as DropdownArrowIcon } from './dropdown-arrow.svg';
import './page.scss';
import './theme.scss';

class Page extends React.Component {
  async componentDidMount() {
    await this.props.fetchRepos();
    this.props.setCurrentRepository(this.props.match.params[0].split('/')[0]);
  }

  changeRepoHandler = (event) => {
    const { value: repositoryId } = event.target;
    this.props.history.push(`/${repositoryId}`);
    this.props.setCurrentRepository(repositoryId);
    this.props.fetchRepositoryContent(repositoryId);
  };

  render() {
    return (
      <div className="Page Theme">
        <Header className="Page-Header" repos={this.props.repos} changeRepoHandler={this.changeRepoHandler}/>

        {this.props.repos.currentRepository &&
          <main className="Page-Main Page-Container">
            <Breadcrumbs className="Page-Breadcrumbs"/>

            <div className="PageHeading Text Text_weight_normal">
              <h1 className="Text Text_type_h1 Text_size_xl Text_weight_normal">arcadia</h1>
              <div className="Dropdown PageHeading-Append">
                <button
                  className="WithIcon Text WithIcon_gap_md WithIcon_align_center Text_color_secondary Dropdown-Trigger"
                  type="button">
                  <span className="Text Text_size_xl">{this.props.repository.currentBranch}</span>
                  <DropdownArrowIcon className="Dropdown-Icon WithIcon-Icon WithIcon-Icon_position_right" />
                </button>
              </div>
            </div>

            <div className="Page-Subheading">
              <span className="Text Text_size_s Text_line-height_m">
                Last commit <a className="Link" href="#">c4d248</a>
                on <a className="Link" href="#">20 Oct 2017, 12:24</a>
                by <Username>robot-srch-releaser</Username>
              </span>
            </div>

            <Switch>
              <Route exact path="/:repositoryId" component={RepoNavigation}/>
              <Route exact path="/:repositoryId/tree/:branch" component={RepoNavigation}/>
              <Route path="/:repositoryId/tree/:branch/:path*" component={RepoNavigation}/>

              <Route exact path="/:repositoryId" component={FileDetail}/>
              <Route exact path="/:repositoryId/blob/:branch" component={FileDetail}/>
              <Route path="/:repositoryId/blob/:branch/:path*" component={FileDetail}/>
            </Switch>
          </main>
        }

        <Footer className="Page-Footer"/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { repos, repository } = state;
  return { repos, repository };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRepos,
  fetchRepositoryContent,
  setCurrentRepository,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
