import { fixedLargeNumber } from "../../../utils/utility";

export function setUpOptions(props){
    return {
        series: [{
            name: props.name_one,
            data: props.data_one
        }, {
            name: props.name_two,
            data: props.data_two
        }],
        options: {
            
            title: {
                text: props.title,
                align: 'center'
            },
            color: ['#6ab04c', '#2980b9'],
            chart: {
                background: 'transparent'
            },
            dataLabels: {
                enabled: false
            },
            chart: {
                toolbar: {
                    tools: {
                        download: false,
                        pan: false,
                    },
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            xaxis: {
                categories: props.datetime,
                type: 'datetime',
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy hh'
                }
            },
            yaxis: [
                {
                    axisTicks: {
                        show: true
                    },
                    
                    min: props.min_y_left,
                    max: props.max_y_left,
                    tickAmount: 4,
                    title: {
                        text: props.title_one
                    },
                    labels: {
                        formatter: function (val, index) {
                            return fixedLargeNumber(val.toFixed(2),1) ;
                        },
                    }
                },
                {
                    axisTicks: {
                        show: true
                    },
                    
                    min: props.min_y_right,
                    max: props.max_y_right,
                    tickAmount: 4,
                    floating: false,
                    opposite: true,
                    title: {
                        text: props.title_two
                    },
                    labels: {
                        formatter: function (val, index) {
                            return fixedLargeNumber(val.toFixed(2),1);
                        },
                    }
                }
            ],
            legend: {
                position: 'top'
            },
            grid: {
                show: true
            }
        }
    }
}
