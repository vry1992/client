import React from 'react';
import { Headline } from '../../components/Headline';
import { SearchForm } from '../../components/SearchForm';

export function Search() {
    return (
        <div className='search'>
            <Headline text='Пошук'/>
            <SearchForm />
        </div>
    )
}