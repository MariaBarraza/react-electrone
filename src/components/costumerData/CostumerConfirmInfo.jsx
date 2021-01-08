import React, {Component, Fragment} from "react";
import { Header, Table , FormGroup} from "semantic-ui-react";
import logorp from "../../logorp.png";
import logoest from "../../logoest.png";
import isNullOrEmpty  from 'check-null-or-empty';
import CostumerPackageCheck from './CostumerPackageCheck';
import { withRouter } from "react-router-dom";
import CostumerFormInfo from "./CostumerFormInfo";

class CostumerConfirmInfo extends Component {

    state = {
        costumerContext: this.props.costumerContext ? this.props.costumerContext : {}
    }

    componentDidMount = ()=> console.log(this.state.costumerContext.state);

    checkAccounts = ()=>{
        let accounts = [];
        const {redpackAccount, redpackPassword, estafetaAccount, estafetaPassword} = this.state.costumerContext.state;
        if(isNullOrEmpty(this.state.redpackAccount)){
            accounts.push(<CostumerPackageCheck logo={logorp} account={redpackAccount} password={redpackPassword}/>);
        }
        if(isNullOrEmpty(this.state.estafetaAccount)){
            accounts.push(<CostumerPackageCheck logo={logoest} account={estafetaAccount} password={estafetaPassword}/>);
        }
        return accounts;
    };

    render = ()=> {
        const {firstName, secondName, lastNameFirst, lastNameSecond, phone, email} = this.state.costumerContext.state;
        return (
             <Fragment>
                <CostumerFormInfo 
                fullName={`${firstName} ${secondName} ${lastNameFirst} ${lastNameSecond}`}
                email={email}
                phone={phone}
                packages={this.checkAccounts()}/>
             </Fragment>
        );
    }
}

export default withRouter(CostumerConfirmInfo);
