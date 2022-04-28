export default interface Deal {
    id: number,
    product: string,
    agreement_date: string,
    facility_letter_date: string,
    sanction_letter_date: string,
    account_name: string,
    details_of_receivable: string,
    status: 'new' | 'done' | 'cancelled',
    state?: State,
    parties?: Party[],
    attachment: string|null
}

interface State {
    id?: number,
    state: string
}

export interface Party {
    id: number,
    name: string,
    email: string,
    mobile: string,
    type: string,
    consultant_type: string,
    signatory_name: string,
    party_address: string,
    branch: number
}