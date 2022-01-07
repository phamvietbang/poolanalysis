import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Alert from '../Monitor/Alert';
import TvlAndSupply from '../Monitor/TvlAndSupply';
import Transactions from '../Transactions';
import AllUser from '../UserPage/AllUser'
import User from '../UserPage/User'

const LinkRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Transactions />} />
            <Route path="/user" element={<User />} />
            <Route path="/all-users" element={<AllUser />} />
            <Route path="/alert" element={<Alert />} />
            <Route path="/tvl-and-total-supply" element={<TvlAndSupply />} />
        </Routes>
    )
}

export default LinkRoutes