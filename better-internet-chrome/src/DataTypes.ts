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
}

interface RawRecord {
    requestID: string
    recordType: RecordType
    url: string
    timeStamp: number
    statusCode?: number
}

interface DomainStatistics {
    [dimain: string]: RequestDetails[]
}