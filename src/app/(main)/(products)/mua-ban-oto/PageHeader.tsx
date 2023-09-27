
'use client'

import './index.css';

import FormAdvancedSearch from "./FormAdvancedSearch";
import { SearchParams, State } from "./type";

interface Props {
    searchParams?: SearchParams
    displayTypeFromServer?: string
    type?: string
    handleSearchCollections?: (data: State) => void
    handleGetDetailCollection?: (data: State) => void
}

export default function PageHeader({ searchParams, displayTypeFromServer, type, handleSearchCollections, handleGetDetailCollection }: Props) {

    return (
        <div className="page-header relative">
            <FormAdvancedSearch
                type={type}
                searchParams={searchParams}
                displayTypeFromServer={displayTypeFromServer}
                handleSearchCollections={handleSearchCollections}
                handleGetDetailCollection={handleGetDetailCollection}
            />
        </div>
    )
}
