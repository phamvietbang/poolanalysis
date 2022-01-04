import React, { useEffect, useState } from 'react'
import { Grid, Container, Select, InputLabel, FormControl, MenuItem, makeStyles, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import TableAlert from './TableAlert'
import { useDispatch, useSelector } from 'react-redux';
import { events_data } from '../../../redux_components/slices/eventsSlice';
const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(4),
        minWidth: 120,
    },
    selectControl: {
        "& .MuiSelect-select:focus": {
            backgroundColor: "transparent"
        }
    }
}));

function createData(type, datetime, user, amount, token, transaction) {
    return { type, datetime, user, amount, token, transaction };
}
const Alert = () => {
    const event_data = useSelector(state => state.events.data)
    const coin = useSelector(state => state.events.listTokens)
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [eventType, setEventType] = useState('All')
    const [eventUser, setEventUser] = useState('')
    const [eventAmount, setEventAmount] = useState(0)
    const [eventDataTable, setEventDataTable] = useState([])
    const [eventToken, setEventToken] = useState('None')
    const dispatch = useDispatch()
    function getEventData() {
        let result = event_data || []
        let events = []
        if (eventUser != '') {
            events = []
            for (var i in event_data) {
                if (event_data[i].user == eventUser) {
                    events.push(event_data[i])
                }
            }
            result = events
        }
        if (result && eventAmount > 0) {
            events = []
            for (var i in result) {
                if (result[i].amount >= eventAmount) {
                    events.push(result[i])
                }
            }
            result = events
        }
        if (result && eventToken != 'None') {
            events = []
            for (var i in result) {
                if (result[i].token == eventToken) {
                    events.push(result[i])
                }
            }
            result = events
        }
        if (result && eventType != 'All') {
            events = []
            for (var i in result) {
                if (result[i].type == eventType) {
                    events.push(result[i])
                }
            }
            result = events
        }
        setEventDataTable([...result]);
    }
    const handleChangeEventType = (event) => {
        if (event.target.value == null) {
            return
        }
        setEventType(event.target.value)
    };
    const handleChangeEventAmount = (event) => {
        if (event.target.value == null) {
            return
        }
        setEventAmount(parseInt(event.target.value))

    };
    const handleChangeEventUser = (event) => {
        if (event.target.value == null) {
            return
        }
        setEventUser(event.target.value)
    }
    const handleChangeEventToken = (value) => {
        if (value == null) {
            return
        }
        setEventToken(value.name)
    }

    useEffect(() => {
        dispatch(events_data()).then(() => setLoading(true))
    }, [])

    useEffect(() => {
        getEventData()
    }, [eventType, eventUser, eventAmount, eventToken, event_data])

    if (!loading) {
        return <div></div>;
    }


    return (

        <Container
            alignItems="center"
        >
            <Grid
                className='card'
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined-label"
                        value={eventType}
                        onChange={handleChangeEventType}
                        className={classes.selectControl}
                    >
                        <MenuItem value={"All"}>All Events</MenuItem>
                        <MenuItem value={"DEPOSIT"}>Deposit</MenuItem>
                        <MenuItem value={"BORROW"}>Borrow</MenuItem>
                        <MenuItem value={"WITHDRAW"}>WithDraw</MenuItem>
                    </Select>
                </FormControl>
                <Autocomplete
                    id="combo-box-demo"
                    options={coin}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 200 }}
                    value={{ 'name': eventToken }}
                    renderInput={(params) => <TextField {...params} label="Token" variant="outlined" />}
                    onChange={(event, value) => handleChangeEventToken(value)}
                />
                <TextField label="Amount (>=)" variant="outlined" onChange={handleChangeEventAmount} />
                <TextField label="Wallet" variant="outlined" onChange={handleChangeEventUser} />
                <Grid className='col-12'>
                <TableAlert data={eventDataTable} />
                </Grid>
                
            </Grid>
        </Container>
    )
}

export default Alert
