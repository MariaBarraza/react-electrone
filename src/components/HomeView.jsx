import React, {Component, Fragment} from 'react';
import { Button, Divider, Grid, Header, Icon, Segment, Container} from 'semantic-ui-react';


export default class HomeView extends Component{

    render() {
        return (
            <Fragment>
                <Container>
                    <Segment placeholder>
                        <Grid columns={2} stackable textAlign='center'>
                            <Divider vertical>Or</Divider>

                            <Grid.Row verticalAlign='middle'>
                                <Grid.Column>
                                    <Button basic animated='fade' style={{width: '100%'}}>
                                        <Button.Content visible>
                                            <Header icon>
                                                <Icon name='search' />
                                                Buscar un cliente
                                            </Header>
                                        </Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='arrow right' />
                                        </Button.Content>
                                    </Button>
                                </Grid.Column>

                                <Grid.Column>
                                <Header icon>
                                    <Icon name='world' />
                                    Agregar un nuevo cliente
                                </Header>
                                <Button primary>Crear</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Container>
            </Fragment>
        );
    }
}