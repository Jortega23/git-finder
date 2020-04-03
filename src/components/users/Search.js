import React, { Component } from 'react'

class Search extends Component {
  state = {
    text: ''
  };

  onChange = (e) =>{
    this.setState({text: e.target.value})
  };

  onSubmit = (e) =>{
    e.preventDefault();
    if(this.state.text === ''){
      this.props.setAlert('Please enter something' , 'light')
    }
    else{
      this.props.searchUsers(this.state.text);
      this.setState({ text: ''});
    }
  };

    render() {
      const { clearButton, clearUsers} = this.props

        return (
            <div>
                <form onSubmit={this.onSubmit} className='form'>
                    <input 
                      type='text' 
                      name='text' 
                      placeholder='Search Users ....' 
                      value={this.state.text}
                      onChange={this.onChange}
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
}

export default Search
