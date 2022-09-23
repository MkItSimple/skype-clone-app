import io from "socket.io-client";
export const ENDPOINT = "http://localhost:8001";
export const socket = io(ENDPOINT);
