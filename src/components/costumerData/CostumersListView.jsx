import React, {Component, Fragment} from "react";
import CostumerSearch from './CostumerSearch';

export default class CostumersListView extends Component{

  render() {
        return (
             <Fragment>
                <CostumerSearch />
             </Fragment>
        );
    }
}