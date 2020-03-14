import { SelectedDomainItem } from "./SelectedDomainItem";
import React from "react";

type SelectedDomainsListProps = {
    domains: string[]
    onInputsChanged: (dic: { [key: number]: string }) => void
}

export class SelectedDomainsList extends React.Component<SelectedDomainsListProps, {}>{

    private domainsDic: { [key: number]: string }

    constructor(props: Readonly<SelectedDomainsListProps>) {
        super(props)
        this.domainsDic = props.domains.reduce((pre: { [key: number]: string }, cur, ind) => {
            pre[ind] = cur
            return pre
        }, {})
    }

    render() {
        return (this.props.domains.map((u, i) =>
            <SelectedDomainItem
                domainName={u}
                key={i}
                anotherKey={i}
                onContentChanged={
                    (c, i) => {
                        this.domainsDic[i] = c
                        this.props.onInputsChanged(this.domainsDic)
                    }} />
        ))
    }
}
