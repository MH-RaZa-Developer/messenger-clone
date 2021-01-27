import './App.css';
import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Message from './components/Message/Message';
import Logo from './logo.jpg';
import Container from '@material-ui/core/Container';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import IconButton from '@material-ui/core/IconButton';

function App() {

  const [input, setInput] = useState('');
  const [message, setMessage] = useState([]);
  const [username, setUsername] = useState('');

  //console.log(input);
  //console.log(message);

  useEffect(() =>{
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      setMessage(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    });
  }, [])

  useEffect(() =>{
    setUsername(prompt("Enter You Name: "));
  }, [])

  const sendMessage = (event) =>{
      event.preventDefault();
      db.collection('messages').add({
        message: input,
        username: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput('');
  }

  const formStyle = {
    background: '#e9e9eb',
    padding: '20px',
    position: 'fixed',
    bottom: '0',
    zIndex: '1',
    width: '90%',
    margin: '20px'
  }

  return (
    <div className="App">
      <img src={Logo} alt="logo"></img>
      <h1>Welcome to {username} on<br /> the Messenger!</h1>
      
          <div style={formStyle}>
            <form>
              <FormControl className="form_control">
                  <Input style={{flex: '1'}} placeholder="Enter message and enter...." value={input} onChange={event => setInput(event.target.value)} />
                  <IconButton size='large' style={{flex: '0'}}>
                    <Button disabled={!input} endIcon={<SendIcon />} color='primary' type='submit' onClick={sendMessage}></Button>
                  </IconButton>
              </FormControl>
            </form>
          </div>

      <FlipMove>
        {
          message.map(({id, message}) => <Message key={id} username={username} message={message} />)
        }
      </FlipMove>
    </div>
  );
}

export default App;