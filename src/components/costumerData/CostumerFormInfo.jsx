import React, {Component, Fragment} from "react";
import { Header, Table , FormGroup} from "semantic-ui-react";
import logorp from "../../logorp.png";
import logoest from "../../logoest.png";
import isNullOrEmpty  from 'check-null-or-empty';
import { withRouter } from "react-router-dom";


export default class CostumerFormInfo extends Component {

    state = {
        fullName: this.props.fullName ? this.props.fullName : 'full name goes here',
        email: this.props.email ? this.props.email : 'email goes here',
        phone: this.props.phone ? this.props.phone : 'phone goes here',
        packages: this.props.packages ? this.props.packages : []
    }

    render = ()=>{
        return (
            <Fragment>
                    <Header>
                        Datos Básicos
                    </Header>
                    <FormGroup>
                        <Table definition>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={2}>Nombre</Table.Cell>
                                    <Table.Cell>{this.state.fullName}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Correo</Table.Cell>
                                    <Table.Cell>{this.state.email}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Teléfono</Table.Cell>
                                    <Table.Cell>{this.state.phone}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </FormGroup>
                    <Header>
                        Datos de Paquetería
                    </Header>
                    {this.state.packages}
                 </Fragment>
        );
    }

}