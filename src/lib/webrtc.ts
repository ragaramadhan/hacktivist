import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  // setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// STUN Server
export const configuration: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun1.l.google.com:19302" }, { urls: "stun:stun2.l.google.com:19302" }],
};

// Create Peer Connection
export const createPeerConnection = (): RTCPeerConnection => {
  const peerConnection = new RTCPeerConnection(configuration);
  return peerConnection;
};

//Create Room
export const createRoom = async (peerConnection: RTCPeerConnection): Promise<string> => {
  const roomRef = await addDoc(collection(db, "video-rooms"), {}); // Correct
  // console.log("Created new room with ID:", roomRef.id);

  const callerCandidatesCollection = collection(db, `video-rooms/${roomRef.id}/callerCandidates`); // Fixed path

  peerConnection.addEventListener("icecandidate", async (event) => {
    if (event.candidate) {
      await addDoc(callerCandidatesCollection, event.candidate.toJSON());
      // console.log("Added ICE candidate to Firestore:", event.candidate.toJSON());
    }
  });

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  await updateDoc(roomRef, {
    offer: {
      sdp: offer.sdp,
      type: offer.type,
    },
  });

  onSnapshot(roomRef, (snapshot) => {
    const data = snapshot.data();
    if (data?.answer && !peerConnection.currentRemoteDescription) {
      const answer = new RTCSessionDescription(data.answer);
      peerConnection.setRemoteDescription(answer);
      // console.log("Set remote SDP answer:", answer);
    }
  });

  return roomRef.id;
};

//Join Room
export const joinRoom = async (peerConnection: RTCPeerConnection, roomId: string) => {
  const roomRef = doc(db, "video-rooms", roomId); // Correct

  const roomSnapshot = await getDoc(roomRef);
  if (roomSnapshot.exists()) {
    // console.log("Joined room with ID:", roomId);

    const roomData = roomSnapshot.data();
    const offer = roomData?.offer;

    if (offer) {
      const offerDescription = new RTCSessionDescription(offer);
      await peerConnection.setRemoteDescription(offerDescription);
      // console.log("Set remote SDP offer:", offerDescription);

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      await updateDoc(roomRef, {
        answer: {
          type: answer.type,
          sdp: answer.sdp,
        },
      });
    }
  } else {
    console.error("Room not found:", roomId);
    return;
  }

  const calleeCandidatesCollection = collection(db, `video-rooms/${roomId}/calleeCandidates`); // Fixed path
  peerConnection.addEventListener("icecandidate", async (event) => {
    if (event.candidate) {
      await addDoc(calleeCandidatesCollection, event.candidate.toJSON());
    }
  });

  onSnapshot(collection(db, `video-rooms/${roomId}/callerCandidates`), (snapshot) => {
    // Fixed path
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        peerConnection.addIceCandidate(candidate);
      }
    });
  });
};
