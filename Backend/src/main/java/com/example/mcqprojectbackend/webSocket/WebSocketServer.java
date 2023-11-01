package com.example.mcqprojectbackend.webSocket;

import org.springframework.stereotype.Component;
import java.util.concurrent.ConcurrentHashMap;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

// #################### WebSocket ####################
// Because Google Sheets writing run asynchronously.
// When writing to Google Sheet failed, the failed operation needs to be pushed to the client.
// When the server tries to push a message, the client may be online or offline.
// Thus, server need try to push message several times.
// At the same time, in order to ensure that the client has indeed received the message.
// The client needs to send a confirmation reply.

@ServerEndpoint(value = "/websocket/{userId}", configurator = WebSocketConfig.class) // Accept websocket request path
@Component
public class WebSocketServer
{
    // The set of websockets for all online clients.
    public static ConcurrentHashMap<String, WebSocketServer> webSocketSet = new ConcurrentHashMap<>();

    // The set of error messages which need to push to client.
    // Because only one user is allowed to write to GoogleSheet at one time.
    // Thus, the timestamp must be unique when a write error or exception occurs.
    // Map<SessionId, Map<TimeStamp, ErrorMessage>>
    public static  ConcurrentHashMap<String, ConcurrentHashMap<String, String>> messageSet = new ConcurrentHashMap<>();
    // WebSocket is not stable.
    // The pipeline will be closed at any time due to some problems,
    // such as refreshing the webpage and restarting the browser.
    // But the sessionId will not change.
    // this  WebSocket's SessionId.
    private String sid = "";
    // this webSocket's session.
    private Session session;


    private void sendMessage(String message)
    {
        session.getAsyncRemote().sendText(message);
    }

    @OnOpen
    public void onOpen(Session session, EndpointConfig config, @PathParam(value = "userId") String userId)
    {
        sid = userId;
        this.session = session;
        this.session.setMaxIdleTimeout(0);
        /*
        if(!messageSet.containsKey(sid))
        {
            messageSet.put(sid, new ConcurrentHashMap<>());
        }*/
        System.out.println("[WebSocket] client [" + sid + "] onOpen.");
        webSocketSet.put(sid, this);
        this.onMessage("hello", this.session);
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
        System.out.println("[WebSocket] client [" + sid + "] Message["+timeStamp+"].");
        this.sendMessage("Hello Client");
    }

    @OnError
    public void onError(Session session, Throwable error)
    {
        error.printStackTrace();
    }
}

