"use client";
import { useState } from "react";
import {
  FiMail,
  FiUser,
  FiClock,
  FiEye,
  FiEyeOff,
  FiSearch,
} from "react-icons/fi";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

const ContractMessages = () => {
  // Static messages data
  const staticMessages: Message[] = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@enterprise.com",
      message:
        "We need to discuss the contract renewal before the end of the quarter. Please let us know your availability for a meeting next week.",
      createdAt: new Date("2023-06-10T14:30:00"),
      read: false,
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@techcorp.com",
      message:
        "The contract terms look good overall. When can we schedule a call to discuss the implementation timeline?",
      createdAt: new Date("2023-06-09T11:20:00"),
      read: true,
    },
    {
      _id: "3",
      name: "Robert Johnson",
      email: "robert@legalpartners.com",
      message:
        "Please find attached our revised contract draft for your review. We've incorporated all the changes we discussed last week.",
      createdAt: new Date("2023-06-08T09:15:00"),
      read: false,
    },
    {
      _id: "4",
      name: "Emily Wilson",
      email: "emily@innovate.co",
      message:
        "Regarding the NDA we signed last month, we'd like to proceed with the main agreement. Can you send us the next steps?",
      createdAt: new Date("2023-06-05T16:45:00"),
      read: true,
    },
    {
      _id: "5",
      name: "Michael Brown",
      email: "michael@globalventures.com",
      message:
        "We have some concerns about section 4.3 of the contract. Could you clarify the liability terms?",
      createdAt: new Date("2023-06-03T10:10:00"),
      read: true,
    },
  ];

  const [messages, setMessages] = useState<Message[]>(staticMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleReadStatus = (id: string) => {
    setMessages(
      messages.map((message) =>
        message._id === id ? { ...message, read: !message.read } : message
      )
    );
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "read" && message.read) ||
      (filter === "unread" && !message.read);

    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter((message) => !message.read).length;

  return (
    <div className="min-h-screen ">
      <div className=" mx-auto space-y-4">
        <div className="flex justify-between items-center ">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Contract Messages
            </h1>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <FiMail className="text-gray-500" />
            <span className="font-medium text-gray-700">
              {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === "all"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Messages
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 ${
                  filter === "unread"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FiEyeOff className="w-4 h-4" />
                <span>Unread</span>
              </button>
              <button
                onClick={() => setFilter("read")}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 ${
                  filter === "read"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FiEye className="w-4 h-4" />
                <span>Read</span>
              </button>
            </div>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiMail className="text-gray-400 w-10 h-10" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No messages found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm
                  ? "No messages match your search criteria."
                  : filter === "read"
                  ? "You have no read messages."
                  : filter === "unread"
                  ? "You have no unread messages."
                  : "You have no messages yet."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <div
                  key={message._id}
                  className={`p-6 hover:bg-gray-50 transition-colors duration-150 ${
                    !message.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                        <FiUser className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                          <span>{message.name}</span>
                          {!message.read && (
                            <span className="inline-block bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">{message.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FiClock className="w-4 h-4" />
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                      <button
                        onClick={() => toggleReadStatus(message._id)}
                        className={`px-3 py-1 rounded-md text-xs font-medium ${
                          message.read
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                        }`}
                      >
                        {message.read ? "Mark Unread" : "Mark Read"}
                      </button>
                    </div>
                  </div>
                  <div className="pl-14">
                    <p className="text-gray-700 whitespace-pre-line">
                      {message.message}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-4">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        Reply
                      </button>
                      <button className="text-sm font-medium text-gray-600 hover:text-gray-800">
                        View Contract
                      </button>
                      <button className="text-sm font-medium text-gray-600 hover:text-gray-800">
                        View History
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractMessages;

// import { useState, useEffect } from "react";
// import styles from "../styles/ContractMessages.module.css";

// const ContractMessages = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch("/api/messages");
//         if (!response.ok) {
//           throw new Error("Failed to fetch messages");
//         }
//         const data = await response.json();
//         setMessages(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, []);

//   const markAsRead = async (id) => {
//     try {
//       // You would need to create an API endpoint for updating messages
//       const response = await fetch(`/api/messages/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ read: true }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update message");
//       }

//       setMessages(
//         messages.map((msg) => (msg._id === id ? { ...msg, read: true } : msg))
//       );
//     } catch (err) {
//       console.error("Error marking as read:", err);
//     }
//   };

//   if (loading) return <div>Loading messages...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className={styles.container}>
//       <h1>Contract Messages</h1>
//       <div className={styles.messagesList}>
//         {messages.length === 0 ? (
//           <p>No messages yet.</p>
//         ) : (
//           messages.map((message) => (
//             <div
//               key={message._id}
//               className={`${styles.messageCard} ${
//                 message.read ? styles.read : styles.unread
//               }`}
//             >
//               <div className={styles.messageHeader}>
//                 <h3>{message.name}</h3>
//                 <span>{new Date(message.createdAt).toLocaleString()}</span>
//                 {!message.read && (
//                   <button
//                     onClick={() => markAsRead(message._id)}
//                     className={styles.markReadButton}
//                   >
//                     Mark as Read
//                   </button>
//                 )}
//               </div>
//               <p className={styles.email}>{message.email}</p>
//               <p className={styles.messageText}>{message.message}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ContractMessages;
