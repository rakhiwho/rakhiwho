import { createContext, useContext } from "react";
import { useEffect, useState } from "react"; 
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";

export const SocketContext = createContext();

export const UseSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children  }) => {
  const [cookies] = useCookies(["access_token"]);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  

  useEffect(() => {
    const user = sessionStorage.getItem("userID");

    if (cookies.access_token && user) {
      const socket = io(import.meta.env.VITE_BACKEND_URL, {
        query: {
          userId: user,
        },
      });
      setSocket(socket);

      socket?.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [cookies.access_token]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
