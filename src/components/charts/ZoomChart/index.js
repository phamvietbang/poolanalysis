import React from 'react'
import Chart from 'react-apexcharts'
import { Button, ButtonGroup, Grid } from '@material-ui/core'
import { setUpOptions, setUpOptionChartOneSeries, setUpOptionChartNormal } from '../Options'

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
const ZoomChart = (prop) => {
    const data = prop.data
    const [chartOptions, setChartOptions] = React.useState(setUpOptions(prop.data))
    const [selectedBtn, setSelectedBtn] = React.useState(3);
    function makeOptions() {
        let props = {...data}
        if (selectedBtn === 1 && props.datetime.length > 24) {
            props.data_one = props.data_one.slice(-24,)
            props.data_two = props.data_two.slice(-24,)
            props.datetime = props.datetime.slice(-24,)
            props.min_y_left = findMinRoundNumber(Math.min(...props.data_one))
            props.min_y_right = findMinRoundNumber(Math.min(...props.data_two))
            props.max_y_left = findMaxRoundNumber(Math.max(...props.data_one))
            props.max_y_right = findMaxRoundNumber(Math.max(...props.data_two))
            return setChartOptions(setUpOptions(props))
        }
        if (selectedBtn === 2 && props.datetime.length > 168) {
            props.data_one = props.data_one.slice(-168,)
            props.data_two = props.data_two.slice(-168,)
            props.datetime = props.datetime.slice(-168,)
            props.min_y_left = findMinRoundNumber(Math.min(...props.data_one))
            props.min_y_right = findMinRoundNumber(Math.min(...props.data_two))
            props.max_y_left = findMaxRoundNumber(Math.max(...props.data_one))
            props.max_y_right = findMaxRoundNumber(Math.max(...props.data_two))
            return setChartOptions(setUpOptions(props))
        }
        if (selectedBtn===3){
            return setChartOptions(setUpOptions(data))
        }
        
    }
    React.useEffect(() => {
        makeOptions()
    }, [data, selectedBtn])
    return (

        <Grid
            className='card'
            container
            xs={8}
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Grid>
                <ButtonGroup aria-label="contained primary button group">
                    <Button color={selectedBtn === 1 ? "secondary" : "primary"} onClick={() => setSelectedBtn(1)}>24H</Button>
                    <Button color={selectedBtn === 2 ? "secondary" : "primary"} onClick={() => setSelectedBtn(2)}>1W</Button>
                    <Button color={selectedBtn === 3 ? "secondary" : "primary"} onClick={() => setSelectedBtn(3)}>1M</Button>
                </ButtonGroup>
            </Grid>
            <Grid>
                <Chart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type='line'
                    height={450}
                    width={800}
                />
            </Grid>

        </Grid>
    )
}

export default ZoomChart


export const ZoomChartOneSeries = (prop) => {
    const data = prop.data
    const [chartOptions, setChartOptions] = React.useState(setUpOptions(prop.data))
    const [selectedBtn, setSelectedBtn] = React.useState(3);
    function makeOptions() {
        let props = {...data}
        if (selectedBtn === 1 && props.datetime.length > 24) {
            props.data_one = props.data_one.slice(-24,)
            props.datetime = props.datetime.slice(-24,)
            return setChartOptions(setUpOptionChartOneSeries(props))
        }
        if (selectedBtn === 2 && props.datetime.length > 168) {
            props.data_one = props.data_one.slice(-168,)
            props.datetime = props.datetime.slice(-168,)
            return setChartOptions(setUpOptionChartOneSeries(props))
        }
        if (selectedBtn===3){
            return setChartOptions(setUpOptionChartOneSeries(data))
        }
        
    }
    React.useEffect(() => {
        makeOptions()
    }, [data, selectedBtn])
    return (

        <Grid
            className='card'
            container
            xs={8}
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Grid>
                <ButtonGroup aria-label="contained primary button group">
                    <Button color={selectedBtn === 1 ? "secondary" : "primary"} onClick={() => setSelectedBtn(1)}>24H</Button>
                    <Button color={selectedBtn === 2 ? "secondary" : "primary"} onClick={() => setSelectedBtn(2)}>1W</Button>
                    <Button color={selectedBtn === 3 ? "secondary" : "primary"} onClick={() => setSelectedBtn(3)}>1M</Button>
                </ButtonGroup>
            </Grid>
            <Grid>
                <Chart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type='line'
                    height={450}
                    width={800}
                />
            </Grid>

        </Grid>
    )
}
export const ZoomChartNormal = (prop) => {
    const data = prop.data
    const [chartOptions, setChartOptions] = React.useState(setUpOptions(prop.data))
    const [selectedBtn, setSelectedBtn] = React.useState(3);
    function makeOptions() {
        let props = {...data}
        if (selectedBtn === 1 && props.datetime.length > 24) {
            props.data_one = props.data_one.slice(-24,)
            props.data_two = props.data_two.slice(-24,)
            props.datetime = props.datetime.slice(-24,)
            return setChartOptions(setUpOptionChartNormal(props))
        }
        if (selectedBtn === 2 && props.datetime.length > 168) {
            props.data_one = props.data_one.slice(-168,)
            props.data_two = props.data_two.slice(-168,)
            props.datetime = props.datetime.slice(-168,)
            return setChartOptions(setUpOptionChartNormal(props))
        }
        if (selectedBtn===3){
            return setChartOptions(setUpOptionChartNormal(data))
        }
        
    }
    React.useEffect(() => {
        makeOptions()
    }, [data, selectedBtn])
    return (

        <Grid
            className='card'
            container
            xs={8}
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Grid>
                <ButtonGroup aria-label="contained primary button group">
                    <Button color={selectedBtn === 1 ? "secondary" : "primary"} onClick={() => setSelectedBtn(1)}>24H</Button>
                    <Button color={selectedBtn === 2 ? "secondary" : "primary"} onClick={() => setSelectedBtn(2)}>1W</Button>
                    <Button color={selectedBtn === 3 ? "secondary" : "primary"} onClick={() => setSelectedBtn(3)}>1M</Button>
                </ButtonGroup>
            </Grid>
            <Grid>
                <Chart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type='line'
                    height={450}
                    width={800}
                />
            </Grid>

        </Grid>
    )
}