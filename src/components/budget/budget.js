import React from 'react';
import APIURL from '../../helpers/environment';
import './budget.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import BudgetYear from './budgetByYear';

export default class Budget extends React.Component {
    state = {
        activeTab: '1',
        data: {}
    }
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })
        fetch(`${APIURL}/budget/currentbudget`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    this.setState({
                        data: data
                    });
                }
            })
            .catch(err => console.log(err));
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div className='budgets'>
                <div className='secondaryContainer'>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }} >Current Budget</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}>
                                2019 Budget</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}>
                                2018 Budget</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '4' })}
                                onClick={() => { this.toggle('4'); }}>
                                2017 Budget</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '5' })}
                                onClick={() => { this.toggle('5'); }}>
                                2016 Budget</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <div className='budgetFile'>
                                        {(this.state.data.fileBinary) ?
                                            <div>
                                                <h6>{this.state.data.fileYear}</h6>
                                                <h3>{this.state.data.fileName}</h3>
                                                <object className='iframe' data={this.state.data.fileBinary} title={this.state.data.fileName} >
                                                    <p>Oops! You don't support PDFs!</p>
                                                    <p><a download={this.state.data.fileName} href={this.state.data.fileBinary}>Download Instead</a></p>
                                                </object>
                                                <p><strong>Document Description:</strong> {this.state.data.documentDesc}</p>
                                                <p><strong>Date File Uploaded: </strong>{this.state.data.updatedAt.substring(0, 10)}</p>
                                            </div>
                                            : <div className="budgetFiller">No Current file</div>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <div className='budgetFile'>
                                        <BudgetYear year={2019}></BudgetYear>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                <Col sm="12">
                                    <div className='budgetFile'>
                                        <BudgetYear year={2018}></BudgetYear>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="4">
                            <Row>
                                <Col sm="12">
                                    <div className='budgetFile'>
                                        <BudgetYear year={2017}></BudgetYear>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="5">
                            <Row>
                                <Col sm="12">
                                    <div className='budgetFile'>
                                        <BudgetYear year={2016}></BudgetYear>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div >
            </div>
        )
    }
}