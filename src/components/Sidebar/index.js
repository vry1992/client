import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { sidebarLinks } from '../../constants/sidebar';
import { routesConfig } from '../../routing';
import { CustomButton } from '../CustomButton';
import { setContentType } from '../../reducers/flowSidebar';
import { contentTypes } from '../../constants/flowSidebar';

export function Sidebar() {

    const dispatch = useDispatch();

    const listSwitch = (link, { type, label, iconPath, clickHandler }) => {
        switch(type) {
            case 'navigation':
                return (
                    <li key={link}>
                        <Link to={routesConfig[link].path}>{ label }</Link>
                    </li>
                )
            case 'flowSidebarOpener': 
                return (
                    <li key={link}>
                       <CustomButton iconPath={iconPath} text={label} onClick={() => {
                            dispatch(clickHandler());
                            dispatch(setContentType(contentTypes.peleng));
                        }
                       }/>
                    </li>
                )
            default: 
                return null
        }
    }

    return (
        <div className='sidebar'>
            <ul>
                { Object.entries(sidebarLinks).map((link) => listSwitch(...link)) }
            </ul>
        </div>
    )
}