import React, {Component, Fragment } from "react";
import { Dimmer, Loader, Button, Segment, Divider } from 'semantic-ui-react';
import { gql,  getApolloContext, InMemoryCache, ApolloClient} from '@apollo/client';
import isNullOrEmpty  from 'check-null-or-empty';
import { withRouter } from "react-router-dom";
import logorp from "../../logorp.png";
import logoest from "../../logoest.png";
import CostumerFormInfo from "./CostumerFormInfo";
import CostumerPackageCheck from "./CostumerPackageCheck";

const GET_COSTUMER = gql`
    query($id: ID!){
        costumer(id: $id){
            id
            fullName
            phonNumber
            email
            packages{
                id
                account
                password
                parcel{
                    id
                    name
                }
            }
        } 
    }
`;

class CostumerInfo extends Component {

    static contextType = getApolloContext();

    state = {
        fullName: '',
        email: '',
        phonNumber: '',
        packages: [],
        loading: true
    }

    checkPackagelogo = parcelName => {
        switch(parcelName){
            case 'Estafeta':
                return logoest;
            case 'Redpack':
                return logorp;
            default:
                return logoest;
        }
    }

    componentDidMount = ()=>{
        const client = new ApolloClient({
            uri: 'http://localhost:5000/graphql',
            cache: new InMemoryCache()
        });

        const {id} = this.props.history.location.state;

        client.query({
            query: GET_COSTUMER,
            variables: {
                id
            }
        }).then(res => {
            const {fullName, email, phonNumber, packages} = res.data.costumer;
            this.setState({
                fullName, 
                email, 
                phonNumber, 
                packages: packages.map(item => {
                    const {parcel} = item;
                    return (
                        <CostumerPackageCheck 
                        logo={this.checkPackagelogo(parcel.name)}
                        account={item.account} 
                        password={item.password}
                        />
                    );
                }), 
                loading: false});
        });
    }

    render = ()=> {
        if(this.state.loading) return (
            <Segment>
                <Dimmer active inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
            </Segment>
        );
        const {fullName, email, phonNumber, packages} = this.state;
        console.log(fullName);
        return (
            <Fragment>
                <Button primary floated='right'>Editar</Button>
                <Divider hidden/>
                <CostumerFormInfo 
                fullName={fullName}
                email={email}
                phone={phonNumber}
                packages={packages}
                />
            </Fragment>
        );
    }
    
}

export default withRouter(CostumerInfo);