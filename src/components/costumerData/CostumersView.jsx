import React, {Component, Fragment} from 'react';
import { Menu, Container } from 'semantic-ui-react'
import {Link} from 'react-router-dom';



export default class CostumerView extends Component{

    state = { activeItem: this.props.startItem }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render = ()=> {
        
        const { activeItem } = this.state

        return (
            <Fragment>
                <Menu secondary>
                    <Link to='/costumerslist'>
                        <Menu.Item
                            name='Buscar clientes'
                            active={activeItem === 'Buscar clientes'}
                            onClick={this.handleItemClick}
                        />
                    </Link>
                    <Link to='/addcostumer'>
                        <Menu.Item
                            name='Registrar clientes'
                            active={activeItem === 'Registrar clientes'}
                            onClick={this.handleItemClick}
                        />
                    </Link>
                </Menu>
                <Container>
                    {this.props.children}
                </Container>
          </Fragment>
        );
    }
}