import React from 'react';
import "./Chat.css";
import { Avatar, IconButton} from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

    export default function Chat() {
        return (
            <div className="chat">
                <div className="chat__header">
                    <Avatar />
                    <div className="chat__headerInfo">
                        <h3>Room name</h3>
                        <p>last seen at .....</p>
                    </div>
                    <div className="chat__headerRight">
                        <IconButton><SearchOutlined /></IconButton>
                        <IconButton><AttachFile /></IconButton>
                        <IconButton><MoreVert /></IconButton>
                    </div>
                </div>

                <div className="chat__body">
                    <p className="chat__message">
                        <span className="chat__name">Prakhar</span>    
                        This is a message.
        <span className="chat__timestamp">{new Date().toUTCString()}</span>
                    </p>

                    <p className="chat__message chat__receiver">
                        <span className="chat__name">Prakhar</span>    
                        This is a message Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque illum aut debitis inventore voluptatum consequatur. Hic a consequuntur maxime totam. Omnis veritatis quidem nesciunt impedit id perspiciatis quas nobis similique?
        <span className="chat__timestamp">{new Date().toUTCString()}</span>
                    </p>

                    <p className="chat__message">
                        <span className="chat__name"></span>    
                        This is a message.
        <span className="chat__timestamp">{new Date().toUTCString()}</span>
                    </p>

                    <p className="chat__message">
                        <span className="chat__name">Prakhar</span>    
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptatum hic numquam. Dolorum, tempore similique voluptatem esse laboriosam exercitationem optio suscipit, eaque totam debitis sint voluptas necessitatibus perferendis, amet accusantium.
        <span className="chat__timestamp">{new Date().toUTCString()}</span>
                    </p>

                    <p className="chat__message chat__receiver">
                        <span className="chat__name">Prakhar</span>    
                        This is a message.
        <span className="chat__timestamp">{new Date().toUTCString()}</span>
                    </p>

                    <p className="chat__message">
                        <span className="chat__name">Prakhar</span>    
                        This is a message.
        <span className="chat__timestamp">{new Date().toUTCString()}</span>
                    </p>

                    <p className="chat__message">
                        <span className="chat__name">Prakhar</span>    
                        This is a message.
        <span className="chat__timestamp">{new Date().toUTCString()}</span>
                    </p>

                    <p className="chat__message chat__receiver">
                        <span className="chat__name">Prakhar</span>    
                        This is a message.
        <span className="chat__timestamp">{new Date().toUTCString()}</span>
                    </p>

                    <p className="chat__message">
                        <span className="chat__name">Prakhar</span>    
                        This is a message.
        <span className="chat__timestamp">{new Date().toUTCString()}</span>
                    </p>
                </div>

                <div className="chat__footer">
                    <InsertEmoticonIcon />
                    <form>
                        <input placeholder="Type a message...." type="text"/>
                        <button type="submit">Send a message</button>
                    </form>
                    <MicIcon /> 
                </div>
            </div>
        )
    }
