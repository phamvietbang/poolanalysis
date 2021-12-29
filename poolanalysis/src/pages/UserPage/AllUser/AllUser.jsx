import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'
import {
    Button, Modal, makeStyles, Backdrop, FormControl,
    Fade, MenuItem, ButtonGroup, Grid, Select, Container
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import BasicTable from './UserTable'
import StatusCard from './../../../components/status-card/StatusCard'
import {
    seriesUsers, countUsersData,
    topDepositsAmount, topDepositsTransact
} from '../../../redux_components/slices/allUsersSlice'
import {
    totalValueData
} from '../../../redux_components/slices/lendingPoolSlice'
import { useState } from 'react'
import { fixedLargeNumber } from '../../../utils/utility'
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        marginRight: theme.spacing(1),
        minWidth: 120,
    },
    selectControl: {
        width: 150,
        height: 37,
        "& .MuiSelect-select:focus": {
            backgroundColor: "transparent"
        }
    }
}));

function findMinRoundNumber(number) {
    let string_number = Math.floor(number) + ''
    let decimal = string_number.length - 1
    let tmp = Math.pow(10, decimal)
    return tmp * Math.floor(number / tmp)
}

function findMaxRoundNumber(number) {
    let string_number = Math.floor(number) + ''
    let decimal = string_number.length - 3
    let tmp = Math.pow(10, decimal)
    return tmp * (Math.floor(number / tmp) + 1)
}

function createData(wallet, number_of_deposits, amount_of_deposits, tvl) {
    return { wallet, number_of_deposits, amount_of_deposits, tvl };
}

const AllUsers = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [top, setTop] = React.useState(5);
    const [tvl_supply, setTvlSupply] = React.useState('tvl');
    const [openChartTwo, setOpenChartTwo] = React.useState(false);
    const [type, setType] = useState('activeUsers')
    const [loadingAll, setLoadingAll] = useState(false)
    const [chartOptionsOne, setChartOptionsOne] = useState({ 'series': [], 'options': { xaxis: { type: "numeric" } } })
    const [chartOptionsTwo, setChartOptionsTwo] = useState({ 'series': [], 'options': {} })
    const [selectedBtn, setSelectedBtn] = useState(3)
    const tvlSupply = useSelector(state => state.lendingpool.totalValue)
    const users = useSelector(state => state.allusers.users)
    const countUsers = useSelector(state => state.allusers.countUsers)
    const topA = useSelector(state => state.allusers.topDepositsA)
    const topT = useSelector(state => state.allusers.topDepositsT)
    console.log(topT)
    console.log(topA)
    console.log(countUsers)
    console.log(users)
    function handleChangeChartOptionsTwo() {
        if (!loadingAll) {
            return
        }
        let wallets = []
        for (var i in topA.wallets) {
            let tmp = topA.wallets[i]
            wallets.push(tmp.slice(0, 3) + '...' + tmp.slice(-3,))
        }
        let baroption = {
            options: {
                xaxis: {

                    categories: wallets
                },
                yaxis: {
                    title: {
                        text: 'Amount (USD)'
                    },
                    labels: {
                        formatter: function (val, index) {
                            // return val.toFixed(0);
                            return fixedLargeNumber(val.toFixed(2), 1)
                        },
                    }
                },
                legend: {
                    position: 'bottom'
                },

                dataLabels: {
                    enabled: false
                },
                chart: {
                    id: "basic-bar",
                    background: 'transparent',
                    toolbar: {
                        tools: {
                            download: false,
                        },
                    }
                },
                title: {
                    text: 'Top wallets having the most amount of deposits',
                    align: 'center'
                }
            },
            series: [
                {
                    name: "Amount",
                    data: topA.totalAmountOfDepositInUSD
                }

            ]
        };
        setChartOptionsTwo(baroption)
    }
    function handleChangeChartOptionsOne() {
        if (!loadingAll) {
            return
        }
        
        let active = users.activeUsers
        let jdeposit = users.justDeposits
        let db = users.depositBorrows
        let datetime = []
        for (var i in users.timestamp) {
            datetime.push(users.timestamp[i] * 1000)
        }
        let tvl = tvlSupply.tvl.slice(0, active.length)
        let supply = tvlSupply.supply.slice(0, active.length)
        datetime = datetime.slice(0, active.length)
        switch (selectedBtn) {
            case 1:
                active = active.slice(-24,)
                jdeposit = jdeposit.slice(-24,)
                db = db.slice(-24,)
                tvl = tvl.slice(-24,)
                supply = supply.slice(-24,)
                datetime = datetime.slice(-24,)
                break
            case 2:
                active = active.slice(-168,)
                jdeposit = jdeposit.slice(-168,)
                db = db.slice(-168,)
                tvl = tvl.slice(-168,)
                supply = supply.slice(-168,)
                datetime = datetime.slice(-168,)
                break
            default:
                break
        }

        let op = {
            series: [{
                name: 'active users',
                data: active,
                type: 'line'
            },
            {
                name: 'just deposit users',
                data: jdeposit,
                type: 'line'
            },
            {
                name: 'deposit and borrow users',
                data: db,
                type: 'line'
            },
            // {
            //     name: 'Total value lock',
            //     data: tvl,
            //     type: 'line'
            // },
            // {
            //     name: 'Total supply',
            //     data: supply,
            //     type: 'line'
            // }
        ],
            options: {
                title: {
                    text: 'Users and total value',
                    align: 'center'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width:2,
                },
                xaxis: {

                    categories: datetime,
                    type: 'datetime',
                    labels: {
                        datetimeFormatter: {
                            year: 'yyyy',
                            month: 'MMM \'yy',
                            day: 'dd MMM',
                            hour: 'HH:mm'
                        }
                    }
                },
                yaxis: [
                    {
                        // axisTicks: {
                        //     show: true
                        // },
                        min: findMinRoundNumber(Math.min(...db)),
                        max: findMaxRoundNumber(Math.max(...active)),
                        title:{
                            text: 'Number of users'
                        },
                        labels: {
                            formatter: function (val, index) {
                                // return val.toFixed(2);
                                return fixedLargeNumber(val, 1)
                            },
                        }
                    },
                    // {
                    //     axisTicks: {
                    //         show: true
                    //     },
                    //     min: findMinRoundNumber(Math.min(...jdeposit)),
                    //     max: findMaxRoundNumber(Math.max(...jdeposit)),
                    //     title:{
                    //         text: 'Just deposit users'
                    //     },
                    //     labels: {
                    //         formatter: function (val, index) {
                    //             // return val.toFixed(2);
                    //             return fixedLargeNumber(val.toFixed(2), 1)
                    //         },
                    //     }
                    // },
                    // {
                    //     axisTicks: {
                    //         show: true
                    //     },
                    //     min: findMinRoundNumber(Math.min(...db)),
                    //     max: findMaxRoundNumber(Math.max(...db)),
                    //     title:{
                    //         text: 'Deposit and borrow users'
                    //     },
                    //     labels: {
                    //         formatter: function (val, index) {
                    //             // return val.toFixed(2);
                    //             return fixedLargeNumber(val.toFixed(2), 1)
                    //         },
                    //     }
                    // },
                    // {
                    //     axisTicks: {
                    //         show: true
                    //     },
                    //     opposite:true,
                    //     min: findMinRoundNumber(Math.min(...tvl)),
                    //     max: findMaxRoundNumber(Math.max(...tvl)),
                    //     title:{
                    //         text: 'Total value lock (USD)'
                    //     },
                    //     labels: {
                    //         formatter: function (val, index) {
                    //             // return val.toFixed(2);
                    //             return fixedLargeNumber(val.toFixed(2), 1)
                    //         },
                    //     }
                    // },
                    // {
                    //     axisTicks: {
                    //         show: true
                    //     },
                    //     min: findMinRoundNumber(Math.min(...tvl)),
                    //     max: findMaxRoundNumber(Math.max(...supply)),
                    //     opposite: true,
                    //     title:{
                    //         text: 'Total supply (USD)'
                    //     },
                    //     labels: {
                    //         formatter: function (val, index) {
                    //             // return val.toFixed(2);
                    //             return fixedLargeNumber(val.toFixed(2), 1)
                    //         },
                    //     }
                    // },
                ],
                chart: {
                    background: 'transparent',
                    toolbar: {
                        tools: {
                            download: false,
                            pan: false,
                        },
                    }
                },
                legend: {
                    position: 'top'
                },
                grid: {
                    show: true
                }
            }
        }

        setChartOptionsOne(op)
    }
    const handleOpenChartTwo = () => {
        setOpenChartTwo(true);
    };
    //

    const handleCloseChartTwo = () => {
        setOpenChartTwo(false);
    };

    const handleChangeTop = (event) => {
        setTop(event.target.value);
    };
    const handleChangeTvlSupply = (event) => {
        setTvlSupply(event.target.value);
    };
    async function fetchData() {
        setLoadingAll(false)
        await Promise.all([
            dispatch(totalValueData()),
            dispatch(topDepositsTransact(5)),
            dispatch(countUsersData()),
            dispatch(seriesUsers()),
            dispatch(topDepositsAmount(top)),
        ])
        setLoadingAll(true)
    }
    useEffect(() => {
        dispatch(topDepositsAmount(top))
    }, [top])
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        handleChangeChartOptionsOne()
    }, [tvl_supply, users, tvlSupply, loadingAll, selectedBtn])
    useEffect(() => {
        handleChangeChartOptionsTwo()
    }, [topA, loadingAll])


    if (!loadingAll) {
        return <div></div>
    }
    const type_amount = [{ 'name': 'Total', 'amount': countUsers.all_users },
    { 'name': 'Active', 'amount': countUsers.active_users },
    { 'name': 'Just Deposit', 'amount': countUsers.just_deposit_users },
    { 'name': 'Deposit-Borrow', 'amount': countUsers.deposit_borrow_users },
    { 'name': 'Lazy Users', 'amount': countUsers.lazy_users }]
    const top_users_transacting = []
    for (var i in topT.walletAddress) {
        top_users_transacting.push(createData(topT.walletAddress[i], topT.numberOfTx[i],
            topT.tvl[i], topT.depositsInUSD[i]))
    }
    console.log(users)
    return (
        <Container fixed={true} maxWidth={"lg"}>
            <Grid
                container
                className='row'
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
            >
                {
                    type_amount.map((item, index) => (
                        <Grid xs={2} key={index}>
                            <StatusCard
                                title={item.name}
                                count={item.amount}
                            />
                        </Grid>
                    ))
                }
            </Grid >
            <Grid className="row">
                <Grid className="col-6">
                    <Grid className="card full-height">
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="baseline"
                        >
                            <Grid>
                                <ButtonGroup aria-label="contained primary button group">
                                    <Button color={selectedBtn === 1 ? "secondary" : "primary"} onClick={() => setSelectedBtn(1)}>24h</Button>
                                    <Button color={selectedBtn === 2 ? "secondary" : "primary"} onClick={() => setSelectedBtn(2)}>1W</Button>
                                    <Button color={selectedBtn === 3 ? "secondary" : "primary"} onClick={() => setSelectedBtn(3)}>1M</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                        {/* chart */}
                        <Chart
                            options={chartOptionsOne.options}
                            series={chartOptionsOne.series}

                            height='400'
                        />
                    </Grid>
                </Grid>
                <Grid className="col-6">
                    <Grid className="card full-height">
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="baseline"
                        >
                            <Grid>
                                <ButtonGroup aria-label="contained primary button group">
                                    <Button color={selectedBtn === 1 ? "secondary" : "primary"} onClick={() => setSelectedBtn(1)}>24h</Button>
                                    <Button color={selectedBtn === 2 ? "secondary" : "primary"} onClick={() => setSelectedBtn(2)}>1W</Button>
                                    <Button color={selectedBtn === 3 ? "secondary" : "primary"} onClick={() => setSelectedBtn(3)}>1M</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                        {/* chart */}
                        <Chart
                            options={chartOptionsOne.options}
                            series={chartOptionsOne.series}

                            height='400'
                        />
                    </Grid>
                </Grid>

            </Grid>
            <Grid className="row">
                <Grid className="col-6">
                    <Grid className="card full-height">
                        {/* chart */}
                        <Chart
                            options={chartOptionsTwo.options}
                            series={chartOptionsTwo.series}
                            type='bar'
                            height='100%'
                        />
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="baseline"
                        >
                            <Grid>
                                <Button variant="outlined" onClick={handleOpenChartTwo}>Full</Button>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={openChartTwo}
                                    onClose={handleCloseChartTwo}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={openChartTwo}>
                                        <Grid
                                            className='card'
                                            container
                                            xs={8}
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center">
                                            <Chart
                                                options={{ ...chartOptionsTwo }.options}
                                                series={{ ...chartOptionsTwo }.series}
                                                type='bar'
                                                height='500'
                                                width={1000}
                                            />
                                            <Grid>
                                                <Select
                                                    labelId="select-outlined-label"
                                                    id="select-outlined"
                                                    value={top}
                                                    onChange={handleChangeTop}
                                                    label="top"
                                                >
                                                    <MenuItem value={5}>5</MenuItem>
                                                    <MenuItem value={10}>10</MenuItem>
                                                    <MenuItem value={15}>15</MenuItem>
                                                </Select>
                                            </Grid>
                                        </Grid>
                                    </Fade>
                                </Modal>
                            </Grid>
                            <Grid>
                                <Select
                                    labelId="select-outlined-label"
                                    id="select-outlined"
                                    value={top}
                                    onChange={handleChangeTop}
                                    label="top"
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className="col-6">
                    <Grid className="card full-height">
                        <BasicTable data={top_users_transacting} />
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}
export default AllUsers