import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import userAtom from "../atom/userAtom";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        const socketInstance = io("http://localhost:5000", {
            query: {
                userId: user?._id,
            },
        });

        socketInstance.on("connect", () => {
            console.log("Connected to server:", socketInstance.id); // Successful connection
            // You can also set a state to indicate connection status
            // setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            console.log("Disconnected from server");
            // Handle disconnection state
            // setIsConnected(false);
        });

        socketInstance.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });

        socketInstance.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [user?._id]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
