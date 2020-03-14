import { Grid, Button } from "@material-ui/core";
import React from "react";
import { DomainStatistics } from "../DataTypes";
import { CollectedDomainsList } from "./CollectedDomainsList";
import { SelectedDomainsList } from "./SelectedDomainsList";

type PacFormProps = {
    domains: DomainStatistics,
    pac: string[]
}

type PacFormState = {
    selected: string[]
}

export class PacForm extends React.Component<PacFormProps, PacFormState> {

    constructor(props: Readonly<PacFormProps>) {
        super(props)
        this.state = {
            selected: []
        }
    }

    render() {
        return (
            <Grid container justify="center">

                <Grid key={0} item={false}>
                    <CollectedDomainsList
                        domainStatistics={this.props.domains}
                        pac={this.props.pac}
                        onListChanged={s => {
                            this.setState({ selected: Array.from(s) })
                            console.log(this.state)
                        }} />
                </Grid>

                <Grid key={1} item={true}>
                    <Button variant='contained' color='primary' onClick={() => console.log(this.state.selected)}>Update</Button>
                    <SelectedDomainsList
                        domains={this.state.selected}
                        onInputsChanged={
                            c => {
                                this.setState({ selected: Object.values(c) })
                            }} />
                </Grid>

            </Grid>
        )
    }
}


export function getMyPacForm(st: DomainStatistics, pac: string[]) {
    return <PacForm domains={st} pac={pac}></PacForm>
}
