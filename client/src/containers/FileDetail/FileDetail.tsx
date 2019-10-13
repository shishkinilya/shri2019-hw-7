import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import fetchBlobContent from 'store/blob/fetchBlobContent';

import './code-view.scss';
import './code-viewer.scss';
import { AppState } from "../../store/types";
import { BlobState } from "../../store/blob/types";

interface FileDetailProps {
  blob: BlobState;
  fetchBlobContent: typeof fetchBlobContent;
}

class FileDetail extends React.Component<RouteComponentProps<Record<string, string>> & FileDetailProps> {
  componentDidMount() {
    const { fetchBlobContent } = this.props;
    const { repositoryId, branch, path } = this.props.match.params;

    fetchBlobContent(repositoryId, branch, path);
  }

  render() {
    return (
      <div className="CodeViewer Page-Streched Page-Streched_xs">
        <div className="CodeViewer-Header">
          <div className="with-icon with-icon_gap_lg">
            <svg className="with-icon__icon with-icon__icon_position_left" width="9" height="20">
              <use href="../../assets/icons/file-code.svg"/>
            </svg>
            <span className="Text Text_line-height_m">
            <span className="Text Text_size_s">ya.make</span>
            <span className="Text Text_size_xs CodeViewer-FileSize">(4 347 bytes)</span>
          </span>
          </div>
          <div className="CodeViewer-HeaderAside">
            <a className="CodeViewer-Download" href="#">
              <svg width="14" height="13">
                <use href="../../assets/icons/download.svg"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="OverflowContainer CodeViewer-Body">
          <table className="CodeView Text CodeView_lang_python Text_size_xxs Text_line-height_m">
            <tbody>
            {this.props.blob.content.split('\n').map((line, index) => (
              <tr key={index}>
                <td className="CodeView-LineNumber">{++index}</td>
                <td className="CodeView-Code">{line}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const { blob } = state;
  return { blob };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ fetchBlobContent }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FileDetail);
