import React from 'react';
import { Link } from 'react-router-dom';

import LOADING_STATUSES from 'constants/loadingStatuses';

import './header.scss';
import logo from './logo.svg'

export default function Header({ className, repos, changeRepoHandler, currentRepo }) {
  return (
    <header className={`Header ${className}`}>
      <div className="Header-Inner Page-Container">
        <Link className="Header-Logo" to="/">
          <img src={logo} width="118" height="20" alt="Arcanum logo" />
        </Link>

        {/*<div className="Dropdown Header-Dropdown">*/}
        {/*  <button*/}
        {/*    className="WithIcon Text Text_size_s Text_line-height_s WithIcon_align_center WithIcon_gap_sm Dropdown-Trigger Dropdown-Trigger_has_border">*/}
        {/*    <span className="Dropdown-TriggerText">Repository Arc</span>*/}
        {/*    <svg className="WithIcon-Icon Dropdown-Icon WithIcon-Icon_position_right" width="16" height="16" target="_blank">*/}
        {/*      <use href="../../assets/icons/dropdown-arrow.svg"/>*/}
        {/*    </svg>*/}
        {/*  </button>*/}
        {/*</div>*/}
        <select onChange={changeRepoHandler} value={currentRepo}>
          {repos.status === LOADING_STATUSES.LOADING ? (
            <option value={null}>Загрузка...</option>
          ) : (
            <>
              <option value={null}>Выберите репозиторий</option>
              {repos.list.map((repo, index) => (
                <option key={index} value={repo}>{repo}</option>
              ))}
            </>
          )}
        </select>
      </div>
    </header>
  )
}
