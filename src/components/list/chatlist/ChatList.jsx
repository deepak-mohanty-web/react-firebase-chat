import "./ChatList.scss";
import { avatar, minus, plus, search } from "../../../../public";
import { useEffect, useState } from "react";
import AddUser from "./adduser/AddUser";
import useUserStore from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import useChatStore from "../../../lib/chatStore";
const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setaddmode] = useState(false);

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const data = res.data();
        // Log the fetched data

        if (!data || !data.chats) {
          setChats([]);
          return;
        }

        const items = data.chats;
        //

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedat));
      }
    );

    return () => {
      unsub();
    };
  });

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true;
    const userChatRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="chatList">
      <div className="search">
        <div className="searchbar">
          <img src={search} alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? minus : plus}
          alt=""
          className="add"
          onClick={() => setaddmode((pre) => !pre)}
        />
      </div>

      {chats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          <img src={chat.user.avatar || avatar} alt="" />
          <div className="text">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
