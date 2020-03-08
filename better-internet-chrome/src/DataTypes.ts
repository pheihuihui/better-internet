type ButtonState = 'ready' | 'collecting'
type StatusType = 'success' | 'error'
type RecordType = 'start' | 'error' | 'complete'

interface ValueType {
    content: string
}

interface RequestDetails {
    requestID: number
    url: string
    timeSpent: number
    resultStatus: StatusType
    comments?: RawRecord[]
}

interface RawRecord {
    requestID: string
    recordType: RecordType
    url: string
    timeStamp: number
    statusCode?: number
}

interface DomainStatistics {
    [domain: string]: RequestDetails[]
}

interface DomainListProps {
    domains: DomainStatistics,
    pac: string[]
}

interface DomainListState {
    domains: DomainStatistics,
    pac: string[],
    selectedUrls: number[]
}

interface UrlItemProps {
    domain: string,
    pac: string[],
    details: RequestDetails[]
}

interface UrlItemState {
    id: number,
    selected: boolean
}

interface RequestItemProps {
    requests: RawRecord[]
}