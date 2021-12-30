import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from "react-router-dom";

const menu = [
    {
        title: 'User Page',
        items: [
            {
                title: 'All Users',
                to: '/'
            },
            {
                title: 'User',
                to: '/user'
            },
        ]
    },
    {
        title: 'Monitor',
        items: [
            {
                title: 'Tvl/Total Supply',
                to: '/tvl-and-total-supply'
            },
            {
                title: 'Alert',
                to: '/alert'
            },
        ]
    },
    {
        title: 'Transactions-Volumn',
        to: '/transactions-volumn'
    },
]

const SingleLevel = ({ item }) => {
    const [className, setClassName] = useState('')
    async function getClassName(){
        if (item.title=='Transactions-Volumn'){
            setClassName('')
        }else{
            setClassName('list_item')
        }
    }
    useEffect(() => {
        getClassName()
    }, [])
    return (
        <Link to={item.to}>
            <ListItem button>
                <ListItemText className={className} primary={item.title} />
            </ListItem>
        </Link>
    );
};
const MultiLevel = ({ item }) => {
    const { items: children } = item;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <React.Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={item.title} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children.map((child, key) => (
                        <MenuItem key={key} item={child} />
                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    );
};
function hasChildren(item) {
    const { items: children } = item;

    if (children === undefined) {
        return false;
    }

    if (children.constructor !== Array) {
        return false;
    }

    if (children.length === 0) {
        return false;
    }

    return true;
}
const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
};
export default function App() {
    return menu.map((item, key) => <MenuItem key={key} item={item} />);
}
