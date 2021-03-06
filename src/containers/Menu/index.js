import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from '../../components/Drawer';
import styles from './styles';
import drawerConfig from '../../components/Drawer/config';
import MenuContent from '../MenuContent';
import { actions as drawerActions } from '../../reducers/drawer';
import { actions as searchBarActions } from '../../reducers/search';

@connect(
  state => ({
    nav: state.nav,
    isDrawerVisible: state.drawer.isDrawerVisible,
    isSearchBarVisible: state.search.isSearchBarVisible,
    isLoginScreenVisible: state.app.isLoginScreenVisible,
  }),
  dispatch => ({
    setDrawerState: drawerState => dispatch(drawerActions.setDrawerState(drawerState)),
    setSearchBarState: searchBarState => dispatch(searchBarActions.setSearchBarState(searchBarState))
  }),
)
export default class Menu extends Component {
    static propTypes = {
      nav: PropTypes.object.isRequired,
      navigation: PropTypes.object.isRequired,
      isDrawerVisible: PropTypes.bool.isRequired,
      isSearchBarVisible: PropTypes.bool.isRequired,
      setDrawerState: PropTypes.func.isRequired,
      setSearchBarState: PropTypes.func.isRequired,
      isAppTypeLoading: PropTypes.bool,
      isLoginScreenVisible: PropTypes.bool.isRequired,
    };

    static defaultProps = {
      isAppTypeLoading: false,
    };

    componentWillReceiveProps(nextProps) {
      if (this.props.isDrawerVisible !== nextProps.isDrawerVisible) {
        const drawerRefMethod = nextProps.isDrawerVisible ? 'openDrawer' : 'closeDrawer';
        if (this.el) this.el[drawerRefMethod]();
      }
      const { routeName: prevRouteName } = this.props.nav.routes[this.props.nav.routes.length - 1];
      const { routeName: nextRouteName } = nextProps.nav.routes[nextProps.nav.routes.length - 1];
      if (prevRouteName !== nextRouteName || this.props.isLoginScreenVisible !== nextProps.isLoginScreenVisible) {
        this.props.setDrawerState(false);
      }
    }

    setDrawerRef = (el) => {
      this.el = el;
    };

    handleDrawerToggle(drawerState) {
      return () => {
        if (this.props.isSearchBarVisible) this.props.setSearchBarState(false);
        if (this.props.isDrawerVisible !== drawerState) {
          this.props.setDrawerState(drawerState);
        }
      };
    }

    renderDrawerContent = navigation => (<MenuContent
      navigation={navigation}
      setDrawerState={this.props.setDrawerState}
      isDrawerVisible={this.props.isDrawerVisible}
    />);

    render() {
      const { navigation } = this.props;
      return (
        <Drawer
          {...drawerConfig}
          ref={this.setDrawerRef}
          style={styles.drawerContainer}
          drawerContent={this.renderDrawerContent(navigation)}
          customStyles={{ drawer: styles.drawer, mask: styles.mask }}
          onDrawerOpen={this.handleDrawerToggle(true)}
          onDrawerClose={this.handleDrawerToggle(false)}
        >
          {this.props.children}
        </Drawer>
      );
    }
}
