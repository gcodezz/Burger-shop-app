import React from 'react'
import IosMenu from 'react-ionicons/lib/IosMenu'

import classes from './DrawerToggle.css'

const drawerToggle = (props) => (
    <div 
        className={classes.DrawerToggle}
        onClick={props.clicked}
    >
        <IosMenu 
            fontSize="60px" color='white'
        />
    </div>
)

export default drawerToggle