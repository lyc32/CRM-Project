package com.example.mcqprojectbackend.webSocket;

import com.example.mcqprojectbackend.memoryDB.MemoryDB;
import com.example.mcqprojectbackend.model.UserState;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.text.*;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

// #################### WebSocket ####################

@ServerEndpoint(value = "/websocket/{userId}", configurator = WebSocketConfig.class) // Accept websocket request path
@Component
public class WebSocketServer
{
    // The set of websockets for all online clients.
    public static ConcurrentHashMap<Long, WebSocketServer> webSocketSet = new ConcurrentHashMap<>();
    private Long sid;
    // this webSocket's session.
    private Session session;

    private MemoryDB memoryDB = new MemoryDB();


    private void sendMessage(String message)
    {
        session.getAsyncRemote().sendText(message);
    }

    @OnOpen
    public void onOpen(Session session, EndpointConfig config, @PathParam(value = "userId") Long userId)
    {
        sid = userId;
        this.session = session;
        this.session.setMaxIdleTimeout(0);
        System.out.println("[WebSocket] client [" + sid + "] onOpen.");
        webSocketSet.put(sid, this);
        if(memoryDB.userStateMap.get(sid) == null)
        {
            memoryDB.userStateMap.put(sid, new ArrayList<>());
        }
    }

    @OnClose
    public void onClose()
    {
        System.out.println("[WebSocket] client [" + sid + "] onClose.");
    }

    // Received a message from the client
    @OnMessage
    public void onMessage(String timeStamp, Session session)
    {
        System.out.println("[WebSocket] client [" + sid + "] Send["+timeStamp+"].");
        SimpleDateFormat tempDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String datetime = tempDate.format(new java.util.Date());
        memoryDB.userStateMap.get(sid).add(new UserState(datetime, timeStamp));
        this.sendMessage(datetime);
    }

    @OnError
    public void onError(Session session, Throwable error)
    {
        error.printStackTrace();
    }
}

