export interface FinancialProductsData {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date
}


export interface FinancialProductsResponse {
    message: string;
    data: FinancialProductsData   
}


export interface FinancialProductsList {
    data : FinancialProductsData[]
}


export interface FinancialProductsUpdateData{
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date
}

export interface FinancialProductsUpdateSuccess{
    message: string;
    data: FinancialProductsUpdateData
}


export interface FinancialProductsDeleteSuccess {
    message: string;
}

export interface FinancialProductsError{
    name: string;
    message: string
}


