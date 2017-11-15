import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with google</a>
          </li>
        );
      default:
        return (
          <li>
            <a onClick={this.props.logoutUser}>Log out</a>
          </li>
        );
    }
  }
  render() {
    return (
      <nav className="light-blue">
        <div className="container">
          <div className="nav-wrapper">
            <Link
              to={this.props.auth ? '/surveys' : '/'}
              className="brand-logo"
            >
              SnapEmail
            </Link>
            <ul id="nav-mobile" className="right">
              {this.renderContent()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps, actions)(Header);
