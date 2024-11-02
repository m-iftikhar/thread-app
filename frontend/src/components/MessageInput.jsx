import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { IoSendSharp } from "react-icons/io5";
import { useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import { selectedConversationAtom,conversationsAtom } from "../../atom/messagesAtom";
import { useRecoilValue,useRecoilState } from "recoil";

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const showToast = useShowToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const setConversations = useRecoilState(conversationsAtom);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText) return;

    setIsSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      setMessages((messages) => [...messages, data]);
      setConversations((prevConvs) => {
				const updatedConversations = prevConvs.map((conversation) => {
					if (conversation._id === selectedConversation._id) {
						return {
							...conversation,
							lastMessage: {
								text: messageText,
								sender: data.sender,
							},
						};
					}
					return conversation;
				});
				return updatedConversations;
			});
			setMessageText("");
			// setImgUrl("");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSendMessage} style={{ flex: 95 }}>
      <InputGroup>
        <Input
          w={"full"}
          placeholder="Type a message"
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
          disabled={isSending}
        />
        <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
          <IoSendSharp />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
