// import React, { Component, PropTypes } from 'react';
// import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
// import { connect } from 'react-redux';
//
// import css from './App.css';
// import LoadingIndicator from '../utils/LoadingIndicator';
// import { action_app_setActiveTabId } from '../actions/app';
// import { action_app_getUserInfo } from '../actions/app';
// import { getColorForCost } from '../utils/helper';
//
// export class App extends Component {
// 	static propTypes = {
// 		activeTabId: PropTypes.number,
// 		userInfo: PropTypes.object,
// 		// userName: PropTypes.string,
// 		// userID: PropTypes.number,
// 		// isAdmin: PropTypes.bool,
// 		// totalCostThisMonth: PropTypes.number,
// 		// monthlyIncome: PropTypes.number,
// 		dispatch: PropTypes.func.isRequired
// 	}
// 	constructor(props) {
// 		super(props);
//
// 		this.state = {
// 			navbarExpanded: false
// 		};
//
// 		this.setActiveTab = this.setActiveTab.bind(this);
// 		this.onLogout = this.onLogout.bind(this);
//
// 	}
//
// 	setActiveTab(id){
// 		const {
// 			dispatch
// 		} = this.props;
// 		this.setState({navbarExpanded: false});
// 		dispatch(action_app_setActiveTabId(id));
// 	}
//
// 	onLogout(){
// 		this.refs.form.submit();
// 	}
//
// 	render() {
// 		const {
// 			dispatch,
// 			activeTabId,
// 			userInfo
// 		} = this.props;
//
// 		if(!userInfo){
// 			dispatch(action_app_getUserInfo());
// 			return null;
// 		}
//
// 		const totalConstStyle = {};
// 		totalConstStyle.color = getColorForCost(userInfo.totalCostThisMonth, userInfo.monthlyIncome);
//
// 		return (
// 			<div>
// 				<Navbar inverse fixedTop fluid expanded={this.state.navbarExpanded} onToggle={() => this.setState({navbarExpanded: !this.state.navbarExpanded})}>
// 					<Navbar.Header>
// 						<Navbar.Brand>
// 							{userInfo.userName}
// 						</Navbar.Brand>
// 						<Navbar.Brand>
// 							This month:&nbsp;
// 							<span style={totalConstStyle}>
// 								 { userInfo.totalCostThisMonth }
// 							</span>
// 							&nbsp;kr
// 						</Navbar.Brand>
// 						<Navbar.Toggle />
// 					</Navbar.Header>
// 					<Navbar.Collapse>
// 						<Nav>
// 							<NavItem className={ activeTabId === 1 ? css.activeNavItem : null} onClick={() => this.setActiveTab(1)}>Input</NavItem>
// 							<NavItem className={ activeTabId === 2 ? css.activeNavItem : null} onClick={() => this.setActiveTab(2)}>Overview</NavItem>
// 							<NavItem className={ activeTabId === 3 ? css.activeNavItem : null} onClick={() => this.setActiveTab(3)}>Logs</NavItem>
// 							<NavItem className={ activeTabId === 4 ? css.activeNavItem : null} onClick={() => this.setActiveTab(4)}>Settings</NavItem>
// 							{userInfo.isAdmin ? (
// 								<NavItem className={ activeTabId === 5 ? css.activeNavItem : null} onClick={() => this.setActiveTab(5)}>Admin</NavItem>
// 							) : (null)}
// 						</Nav>
// 						<Nav pullRight>
// 							<NavItem style={{marginTop: -7, marginBottom: -7}}>
// 								<form ref={'form'} action='util/logout.php' method='post'>
// 									<Button bsStyle="danger" block onClick={this.onLogout}>Logout</Button>
// 								</form>
// 							</NavItem>
// 						</Nav>
// 					</Navbar.Collapse>
// 				</Navbar>
// 				<div className='container' style={{position: 'absolute', top: 50, left: 0, right: 0, bottom: 0}}>
//
// 					<LoadingIndicator />
// 				</div>
// 			</div>
// 		);
// 	}
// }
//
// function mapStateToProps(state) {
// 	const activeTabId = state.activeTabId;
// 	const userInfo = state.userInfo;
// 	return {
// 		activeTabId,
// 		userInfo
// 	};
// }
//
// export default connect(mapStateToProps)(App);
