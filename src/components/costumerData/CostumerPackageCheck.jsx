import React, {Component, Fragment} from "react";
import { Table , FormGroup, Segment, Image } from "semantic-ui-react";

export default class CostumerPackageCheck extends Component {

    state = {
        logo: this.props.logo ? this.props.logo : '',
        account: this.props.account ? this.props.account : '',
        password: this.props.password ? this.props.password : ''
    }

    render = ()=> (
        <Fragment>
            <Segment raised>
                    <Image src={this.state.logo} size='tiny' spaced />
                </Segment>
                <FormGroup>
                    <Table definition>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}>Cuenta</Table.Cell>
                                <Table.Cell>{this.state.account}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Clave</Table.Cell>
                                <Table.Cell>{this.state.password}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </FormGroup>
        </Fragment>
    );
}