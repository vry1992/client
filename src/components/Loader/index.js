import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { isLoading } from '../../selectors';
import './index.scss';

const loaderRoot = document.getElementById('loader');
const app = document.getElementById('root');
const className = 'blur-bg-loading';

export function Loader({
    isLocal = false,
    show = false
}) {
  return show ? ( 
    <div className={isLocal ? 'loader local-loader' : 'loader'}>
        <Spinner animation='grow' />
    </div>
  ) : null;
}

export function LoaderPortal() {

    const showLoader = useSelector(isLoading);

    useEffect(() => {
        const classList = app.classList;
        if (showLoader && !classList.contains(className)) {
            classList.add(className);
        }
        if (!showLoader && classList.contains(className)) {
            classList.remove(className);
        }
    }, [showLoader]);

    return ReactDOM.createPortal(
        <Loader show={showLoader}/>,
        loaderRoot
    );
}