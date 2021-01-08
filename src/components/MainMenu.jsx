import React, {Component} from 'react';
import { Menu, MenuItem} from 'semantic-ui-react';

import {Link} from 'react-router-dom';


export default class MainMenu extends Component{

    state = { activeItem: 'Inicio' }


    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        //window.location.reload();
    }

    resetMenu = ()=> this.setState({activeItem: 'Clientes'});
    
    /*componentDidMount = ()=> {
        this.setState({activeItem: 'Inicio'});
    }*/

    render = ()=> {
        const {activeItem} = this.state;
        return (
                
            <Menu pointing secondary vertical>
                <Link to='/'>
                    <MenuItem
                    name='Clientes'
                    active={activeItem === 'Clientes'}
                    onClick={this.handleItemClick}
                    />
                </Link>
                <Link to='/users'>
                    <MenuItem
                    name='Usuarios'
                    active={activeItem === 'Usuarios'}
                    onClick={this.handleItemClick}
                    />
                </Link>
            </Menu>
        );
    }
}