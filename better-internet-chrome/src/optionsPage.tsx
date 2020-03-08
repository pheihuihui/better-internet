import React from "react"
import { Button } from '@material-ui/core'

class UrlList extends React.Component<DomainListProps, DomainListState> {

    constructor(props: Readonly<DomainListProps>) {
        super(props)
        this.state = {
            domains: props.domains,
            pac: props.pac,
            selectedUrls: []
        }
    }

    render() {
        let dms: string[] = []
        for (const key in this.state.domains) {
            if (this.state.domains.hasOwnProperty(key)) {
                dms.push(key)
            }
        }
        return (
            <ul>
                {dms.map((u, i) => (
                    <li key={i}>{u}</li>
                ))}
            </ul>
        )
    }
}

export let myButton = <Button />

export let getUrlList = (st: DomainStatistics) => <UrlList domains={st} pac={[]} />