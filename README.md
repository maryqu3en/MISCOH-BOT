# MISCOH BOT

**MISCOH BOT** is an AI-powered code assistant and chat platform for developers. Instantly get code help, debugging, and programming answers in a modern, secure chat interface.

Powered by **Cohere AI APIs**. 
---

## Features

- 💡 **Instant Code Help:** Ask questions and get code, explanations, or debugging tips in seconds.
- 🎨 **Modern Chat UI:** Clean, responsive interface with dark/light mode and code highlighting.
- 🔒 **Secure & Private:** Your chats and code are private and protected with secure authentication.
- 📝 **Chat History:** All your sessions are saved and searchable.
- 🤖 **AI Assistant:** Powered by advanced AI models for accurate and helpful responses.

---

## API Overview

### Authentication

- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT token
- `GET /api/auth/me` — Get current user info (requires token)

### Sessions (Chats)

- `GET /api/sessions` — List all chat sessions for the user
- `POST /api/sessions` — Create a new chat session `{ title }`
- `DELETE /api/sessions/:id` — Delete a chat session

### Messages

- `GET /api/chats/:sessionId` — Get all messages for a session
- `POST /api/chats` — Add a message `{ message, role, session }`

### AI Assistant

- `POST /api/cohere/generate` — Get an AI-generated reply `{ prompt, session }`

---

## Customization

- **Themes:** Toggle dark/light mode from the sidebar.
- **Environment:** Configure API endpoints and keys in `.env` files.
- **AI Model:** Plug in your own AI backend by editing `server/controllers/cohere.controller.js`.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Credits

- Built with [React](https://react.dev/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), and [Cohere](https://cohere.com/) AI.