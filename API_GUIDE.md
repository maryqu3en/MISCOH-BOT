### **1. User Registration**
- **API:** `POST /api/auth/register`
- **Body:** `{ username, email, password }`
- **Frontend:** Call this when a user signs up. On success, store the returned JWT token.

---

### **2. User Login**
- **API:** `POST /api/auth/login`
- **Body:** `{ email, password }`
- **Frontend:** Call this when a user logs in. On success, store the JWT token for authenticated requests.

---

### **3. Get Current User**
- **API:** `GET /api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Frontend:** Use this to fetch the logged-in user's info (e.g., on app load if token exists).

---

### **4. Create a Chat Session**
- **API:** `POST /api/sessions`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ title }` (optional)
- **Frontend:** Call this to start a new chat (e.g., when user clicks "New Chat"). Store the returned session ID.

---

### **5. Get All User Sessions**
- **API:** `GET /api/sessions`
- **Headers:** `Authorization: Bearer <token>`
- **Frontend:** Call this to list all chat sessions for the user (e.g., sidebar/history).

---

### **6. Get a Single Session**
- **API:** `GET /api/sessions/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Frontend:** Call this to get info for a specific session (optional, if you need more details).

---

### **7. Delete a Session**
- **API:** `DELETE /api/sessions/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Frontend:** Call this to delete a chat session (e.g., user clicks "Delete Chat").

---

### **8. Get Chat Messages for a Session**
- **API:** `GET /api/chats/:sessionId`
- **Headers:** `Authorization: Bearer <token>`
- **Frontend:** Call this when opening a chat to load the conversation history.

---

### **9. Add a Chat Message**
- **API:** `POST /api/chats`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ message, role, session }`
- **Frontend:** Call this when the user sends a message.  
  - `role` is `"user"` for user messages, `"assistant"` for assistant replies.
  - `session` is the current session ID.

---

### **10. Delete All Messages in a Session**
- **API:** `DELETE /api/chats/session/:sessionId`
- **Headers:** `Authorization: Bearer <token>`
- **Frontend:** Call this to clear a chat's history.

---

### **11. Delete a Single Message**
- **API:** `DELETE /api/chats/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Frontend:** Call this to delete a specific message.

---

### **12. Generate Assistant Response**
- **API:** `POST /api/cohere/generate`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ prompt, session }`
- **Frontend:**  
  - After the user sends a message, call this to get the assistant's reply.
  - Use the returned text as the assistant's message and store it with `POST /api/chats`.

---

## **Example Chat Flow**
1. **User logs in** → store JWT.
2. **User starts a new chat** → `POST /api/sessions` → get session ID.
3. **User sends a message**:
   - `POST /api/chats` (save user message)
   - `POST /api/cohere/generate` (get assistant reply)
   - `POST /api/chats` (save assistant reply)
4. **Load chat history** → `GET /api/chats/:sessionId`
5. **User can delete messages or sessions as needed.**
