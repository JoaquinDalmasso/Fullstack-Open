import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (
{    handleLogin,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange}
) => {

    return(
    <div>
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
            <input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form> 
      </div>
)
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

export default LoginForm