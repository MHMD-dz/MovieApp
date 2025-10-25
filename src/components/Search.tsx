import React from 'react'

interface SearchProps  {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchTerm, setSearchTerm }: SearchProps) => {
    return (
        <div className='search' >
            <div>
                <img src="./search.svg" alt="search" />
                <input
                    type="text" 
                    placeholder='Search'
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                />

            </div>
        </div>
  )
}

export default Search