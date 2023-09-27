'use client'

import './index.css'

type Props = {
    isLoading: boolean
}

export default function LoadingClient({ isLoading }: Props) {
    return (
        <div
            className={`${isLoading ? 'flex' : 'hidden'} loading-client`}
        >
            <i className="fa-duotone fa-spinner-third fa-spin text-6xl"></i>
        </div>
    );
}
