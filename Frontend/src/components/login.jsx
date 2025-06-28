import React, { useState } from 'react';

const Login = () => {
  const [role, setRole] = useState('Developer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
 // Send login data to backend (you'll connect this later)
    console.log('Login Data:', { role, email, password });
  };

  return (
    <div style={styles.container}>
      <h2>Login as:</h2>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={styles.input}
      >
        <option value="Developer">Developer</option>
        <option value="Sales Manager">Sales Manager</option>
        <option value="Owner">Owner</option>
      </select>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: '100px auto',
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Login;
