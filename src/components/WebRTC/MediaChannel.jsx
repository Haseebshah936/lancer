const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const localConnection = async (
  answer = {
    type: "answer",
    sdp: "v=0\r\no=- 7718329436387693372 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:2263681282 1 udp 2113937151 584be01d-65e0-4d21-a516-58da16fa780c.local 54842 typ host generation 0 network-cost 999\r\na=ice-ufrag:VMhO\r\na=ice-pwd:PPVnfIwfV/w3BwyrT4yfyUGi\r\na=ice-options:trickle\r\na=fingerprint:sha-256 4F:D3:ED:22:FF:80:E6:01:13:DB:20:36:CC:81:9F:DC:18:5A:74:0E:C6:10:27:55:16:A0:F9:A8:60:89:17:7D\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
  }
) => {
  const lc = new RTCPeerConnection(servers);
  const userMedia = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  // userMedia.
  const dc = lc.createDataChannel("channel");
  dc.onmessage = (e) => console.log("Just recieved a message ", e.data);
  dc.onopen = (e) => console.log("Connection oppend");
  lc.onicecandidate = (e) =>
    console.log("New ice candidate ", JSON.stringify(lc.localDescription));
  lc.createOffer()
    .then((offer) => lc.setLocalDescription(offer))
    .then(() => console.log("Local Description set successfully"));

  lc.setRemoteDescription(answer).then(() => console.log("Connection done"));
  const send = (msg) => {
    dc.send(msg);
  };
  send("Hello");
};

const remoteConnection = (
  offer = {
    type: "offer",
    sdp: "v=0\r\no=- 8436033115020922166 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 12852 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 36.255.101.9\r\na=candidate:2355692467 1 udp 2113937152 c549bc21-ee60-4ee9-b795-50f9fd56e566.local 60953 typ host generation 0 network-cost 999\r\na=candidate:3593008626 1 udp 1677729536 36.255.101.9 12852 typ srflx raddr 0.0.0.0 rport 0 generation 0 network-cost 999\r\na=ice-ufrag:dQ9y\r\na=ice-pwd:PelnoaJyh0H/XZFiVjjN9u2M\r\na=ice-options:trickle\r\na=fingerprint:sha-256 F6:9B:20:D1:FD:77:B7:56:D7:D4:2E:52:04:06:9A:5C:89:EA:BD:04:BE:BB:FF:E1:B4:4F:C1:BD:0D:80:07:B5\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
  }
) => {
  const rc = new RTCPeerConnection(servers);
  rc.onicecandidate = (e) =>
    console.log("New ice candidate ", JSON.stringify(rc.localDescription));
  rc.ondatachannel = (e) => {
    rc.dc = e.channel;
    rc.dc.onmessage = (e) => console.log("Recieved a new message ", e.data);
    rc.dc.onopen = (e) => console.log("Connection opended");
  };

  rc.setRemoteDescription(offer).then(() => console.log("Connection done"));
  rc.createAnswer()
    .then((ans) => rc.setLocalDescription(ans))
    .then(() => console.log("Answer submited"));
  const send = (msg) => {
    rc.dc.send(msg);
  };
  send("Hi");
};
