import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import {Chat} from './index';

const useStyles = makeStyles(() => ({
    'chats': {
      height: 380,
      padding: 0,
      overflow: 'auto'
    },
  }));

const Chats = (props) => {
    const classes = useStyles();

    return (
        <List className={classes.chats} id={'scroll-area'}>
            {props.chats.map((chat, index) => {
                return <Chat text={chat.text} type={chat.type} key={index.toString()} />
            })}
        </List>
    )
};

export default Chats