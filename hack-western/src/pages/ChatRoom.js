import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"

const socket = io.connect("http://localhost:8080")

function ChatRoom() {

    const [ me, setMe ] = useState("")
    const [ stream, setStream ] = useState()
    const [ receivingCall, setReceivingCall ] = useState(false)
    const [ caller, setCaller ] = useState("")
    const [ callerSignal, setCallerSignal ] = useState()
    const [ callAccepted, setCallAccepted ] = useState(false)
    const [ idToCall, setIdToCall ] = useState("")
    const [ callEnded, setCallEnded ] = useState(false)
    const [ name, setName ] = useState("")
    const [ copied, setCopied] = useState(false)


    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true}).then((stream) => {
        setStream(stream)
        if (myVideo.current) {
        myVideo.current.srcObject = stream;
        }    
    })

    socket.on('me', (id) => {
        setMe(id)
        console.log("User ID:", id);
    })

    socket.on("callUser", (data) => {
        setReceivingCall(true)
        setCaller(data.from)
        setName(data.name)
        setCallerSignal(data.signal)
    })
    }, [])

    const callUser = (id) => {
    const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream
    })

    peer.on("signal", (data) => {
        socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name
        })
    })

    peer.on("stream", (stream) => {
        if (userVideo.current) {
        userVideo.current.srcObject = stream
        }
    })

    socket.on("callAccepted", (signal) => {
        setCallAccepted(true)
        peer.signal(signal)
    })

    connectionRef.current = peer

    }

    const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer ({
        initiator: false,
        trickle: false,
        stream: stream
    })

    peer.on("signal", (data) => {
        socket.emit("answerCall", {signal: data, to: caller})
    })

    peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream
    })

    peer.signal(callerSignal)
    connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }

    return (
    <div className="flex items-center justify-center gap-10 h-screen">
        <div className="video">
        {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px"}} />}
        </div>
        <div className="video">
        {callAccepted && !callEnded ?
        <video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
        null}
        </div>
        <div className="grid grid-rows-4">
            <p>Enter Username</p>
            <input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px" }}
            />
            <CopyToClipboard text={me} onCopy={() => 
            setCopied(true)
            }>
            <button className="hidden md:inline bg-slate-900 text-white text-sm px-2 lg:px-4 py-1 lg:py-2 rounded-full dark:bg-slate-800">Copy ID</button>
            </CopyToClipboard>
            {copied && <span style={{ color: "green" }}>ID copied to clipboard!</span>}
            <input
            label="ID to call"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            />
            <div className="call-button">
            {callAccepted && !callEnded ? (
                <button>End Call</button>
            ) : (
                <button className="hidden md:inline bg-slate-900 text-white text-sm px-2 lg:px-4 py-1 lg:py-2 rounded-full dark:bg-slate-800" onClick={() => callUser(idToCall)}>Call User</button>
            )}
            {idToCall}
            </div>
        </div>
        <div>
        {receivingCall && !callAccepted ? (
            <div className="caller">
            <h1 className="font-bold text-3xl">{name} is Calling</h1>
            <button className="hidden md:inline bg-slate-900 text-white text-sm px-2 lg:px-4 py-1 lg:py-2 rounded-full dark:bg-slate-800" onClick={answerCall}>Answer</button>
            </div>
        ) : null}
        </div>
    </div>
    );
    }

    export default ChatRoom;
