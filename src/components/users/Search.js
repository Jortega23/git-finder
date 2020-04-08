import React, {useState, useContext} from 'react'
import GitHubContext from '../../context/github/githubContext'

const Search = ({ clearButton, clearUsers, setAlert}) => {
  const githubContext = useContext(GitHubContext)


 const [text, setText] = useState('');

 const onChange = (e) =>{
    setText(e.target.value)
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    if(text === ''){
      setAlert('Please enter something' , 'light')
    }
    else{
      githubContext.searchUsers(text);
      setText('')
    }
  };
        return (
            <div>
                <form onSubmit={onSubmit} className='form'>
                    <input 
                      type='text' 
                      name='text' 
                      placeholder='Search Users ....' 
                      value={text}
                      onChange={onChange}
                    />
                    <input 
                      type='submit' 
                      value='Search' 
                      className='btn btn-dark btn-block' 
                    />
                </form>

                {clearButton && 
                  <button 
                    className='btn btn-light btn-block' 
                    onClick={clearUsers}> 
                    Clear
                  </button>
                }
                
            </div>
        )
}

export default Search
