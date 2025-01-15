import cron from "node-cron";
import { activateRoom, deactiveRoom, roomDeactive, savedRoom } from "@/models/chatroom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date | { seconds: number; nanoseconds: number };
}

export function startCronJobs() {
  // Create chat room every day at 9 Pagi
  cron.schedule(
    "0 9 * * *",
    async () => {
      console.log("menjalankan aktivasi room...");
      try {
        await activateRoom();
        console.log("bisa ni mengaktifkan room");
      } catch (error) {
        console.error("Gagal mengaktifkan room:", error);
      }
    },
    {
      timezone: "Asia/Jakarta",
    }
  );

  // Delete expired chat rooms every 17.00 Wib  minutes
  cron.schedule(
    "0 17 * * *",
    async () => {
      console.log("menjalankan deaktivasi room...");
      try {
        await deactiveRoom();
        console.log("bisa ni deactive room");
        // lu harus simpan semua data chat kedalam history
      } catch (error) {
        console.error("Gagal deactive room:", error);
      }
    },
    {
      timezone: "Asia/Jakarta",
    }
  );

  // Cron job untuk menghapus room yang sudah tidak aktif setiap hari jam 18:01
  cron.schedule(
    "1 18 * * *",
    async () => {
      console.log("Menjalankan penghapusan room yang tidak aktif...");
      try {
        // await deleteRoomIfExpired();
        const data = await roomDeactive();

        // Nyimpen history room. ( dari firebase )
        data?.map(async (el) => {
          const chatroom = await findChatRoomInFirestore(el?.participants[0], el?.participants[1]);
          const roomId = chatroom?.id;
          const mongoDbRoomId = el?._id?.toString();

          if (!roomId) return;

          const messages: Message[] = await fetchMessagesFromFirestore(roomId);
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/keep-chat-history`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages,
              mongoDbRoomId,
            }),
          });
        });

        await savedRoom();
        console.log(`Success Cron Job Di jam 18.01`);
      } catch (error) {
        console.error("Gagal menghapus room yang tidak aktif:", error);
      }
    },
    {
      timezone: "Asia/Jakarta",
    }
  );

  // // CRON JOB UNTUK KENNY TESTING APABILA GA DIPAKAI TOLONG DI COMMEND
  // cron.schedule(
  //   "*/1 * * * *",
  //   async () => {
  //     console.log("Menjalankan penghapusan room yang tidak aktif...");
  //     try {
  //       // await deleteRoomIfExpired();
  //       const data = await roomDeactive();

  //       data?.map(async (el) => {
  //         const chatroom = await findChatRoomInFirestore(el?.participants[0], el?.participants[1]);
  //         const roomId = chatroom?.id;
  //         const mongoDbRoomId = el?._id?.toString();

  //         if (!roomId) return;

  //         const messages: Message[] = await fetchMessagesFromFirestore(roomId);
  //         await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/keep-chat-history`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             messages,
  //             mongoDbRoomId,
  //           }),
  //         });
  //       });

  //       console.log("Cron jalan");
  //     } catch (error) {
  //       console.error("Gagal menghapus room yang tidak aktif:", error);
  //     }
  //   },
  //   {
  //     timezone: "Asia/Jakarta",
  //   }
  // );
}

export const findChatRoomInFirestore = async (contactId: string, clientId: string) => {
  // console.log(contactId, clientId, "INI TESSSS");
  const chatRoomsRef = collection(db, "chat-rooms");

  const q = query(chatRoomsRef, where("participants", "array-contains", clientId));
  const querySnapshot = await getDocs(q);

  for (const doc of querySnapshot.docs) {
    const data = doc.data();
    if (data.participants.includes(contactId)) {
      return { id: doc.id, ...data };
    }
  }

  return null;
};

const fetchMessagesFromFirestore = async (roomId: string) => {
  if (!roomId) return;

  const roomDoc = doc(db, "chat-rooms", roomId);
  const roomSnapshot = await getDoc(roomDoc);

  if (roomSnapshot) {
    const data = roomSnapshot.data();
    return data?.messages;
  }

  return [];
};
