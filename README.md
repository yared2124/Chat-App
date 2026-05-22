
# Chat App – Firebase Powered Real‑Time Messenger

A feature‑rich real‑time chat application built with **Firebase**. Users can sign up, send text messages, share images/files, see when someone is typing, get read receipts, create group chats, and receive push notifications – all with live synchronization.

## ✨ Features

- 🔐 **Authentication** – Email/Password, Google Sign‑in, and anonymous guest mode.
- 💬 **One‑on‑One & Group Chats** – Create private conversations or group chats with multiple participants.
- 🖼️ **Media & File Sharing** – Upload images, documents, and other files via Firebase Storage.
- ✍️ **Typing Indicators** – See in real time when the other person is typing.
- 👁️ **Read Receipts** – Check if your message has been delivered and read (single/double checkmarks).
- 🔔 **Push Notifications** – Get notified about new messages even when the app is in the background (FCM).
- 📱 **Responsive UI** – Works seamlessly on desktop, tablet, and mobile.
- 🗂️ **Chat History** – All messages persisted in Cloud Firestore; load previous conversations on demand.
- 👤 **User Profile** – Set display name and avatar (upload to Storage).
- 🚪 **Logout / Switch Account** – Securely end session.

## 🧱 Tech Stack

| Component       | Technology |
|----------------|------------|
| Frontend        | HTML5, CSS3 (Tailwind CSS / custom), JavaScript (ES2022) |
| Backend (BaaS)  | **Firebase** – Authentication, Firestore, Storage, Cloud Messaging (FCM) |
| Real‑time Sync  | Cloud Firestore snapshot listeners |
| Notifications   | Firebase Cloud Messaging (service worker) |
| Hosting (opt.)  | Firebase Hosting |

## 📋 Prerequisites

- Node.js (v16 or later) – only if using build tools / CLI.
- A **Firebase account** (free tier is sufficient).
- A registered **web app** in the Firebase Console.
- (Optional) Firebase CLI for deployment.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/firebase-chat-app.git
cd firebase-chat-app
```

### 2. Create a Firebase Project

- Go to [Firebase Console](https://console.firebase.google.com/).
- Click **Add project** → name it (e.g., "Advanced Chat App") → create.
- Disable Google Analytics (optional) to keep it simple.

### 3. Register your web app

- Click the **Web** icon (`</>`) to add a web app.
- Register a nickname (e.g., `chat-web`).
- Copy the **firebaseConfig** object – you will paste it into `firebase-config.js`.

### 4. Enable required Firebase services

#### Authentication
- Go to **Authentication** → **Sign‑in methods**.
- Enable **Email/Password** and **Google** (or any other providers you want).
- (Optional) Enable **Anonymous** for guest login.

#### Firestore Database
- Go to **Firestore Database** → **Create database**.
- Start in **test mode** (for development). You will update security rules later.
- Choose a region (e.g., `eur3` or `us-central1`).

#### Storage (for images & files)
- Go to **Storage** → **Get started**.
- Start in **test mode** (allow reads/writes for development).

#### Cloud Messaging (for push notifications)
- Go to **Cloud Messaging** → note your **Sender ID** and **Web Push Certificate** (or generate a key pair). You will use them in the service worker.

### 5. Configure the app

Create a file named `firebase-config.js` (or copy from `firebase-config.example.js`):

```javascript
// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
```

> **Note:** For push notifications, also add a `firebase-messaging-sw.js` service worker in the public root. See the `public` folder of the repo for an example.

### 6. Install dependencies (if any)

If using a simple static setup, no npm install is required – just include the Firebase SDK via script tags in `index.html`. If using a build tool (Vite, Webpack):

```bash
npm install
```

### 7. Run the app

#### Development (static server)
```bash
npx serve .
# or use any other static server
```
Open `http://localhost:3000` (or the shown port).

#### Development with live reload (Vite)
```bash
npm run dev
```

### 8. (Optional) Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # follow prompts, set public directory as "."
firebase deploy
```


## 🔒 Security Rules (Production)

Update Firestore, Storage, and (if used) Realtime Database rules.

**Firestore rules example (`firestore.rules`):**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection – only the user can read/write their own doc
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // Chats – participants can read
    match /chats/{chatId} {
      allow read: if request.auth != null && resource.data.participants[request.auth.uid] != null;
      allow write: if request.auth != null && resource.data.owner == request.auth.uid;
    }
    // Messages – participants can read/write
    match /messages/{chatId}/{messageId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/chats/$(chatId)) &&
        get(/databases/$(database)/documents/chats/$(chatId)).data.participants[request.auth.uid] != null;
    }
    // Typing indicators – participants can read/write
    match /typing/{chatId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/chats/$(chatId)) &&
        get(/databases/$(database)/documents/chats/$(chatId)).data.participants[request.auth.uid] != null;
    }
  }
}
```

**Storage rules (allow only authenticated users):**

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /chat_media/{userId}/{fileId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 💡 Usage Walkthrough

1. **Register** – Create a new account (email/password or Google).
2. **Login** – Access the main chat dashboard.
3. **Start a chat** – Click on a user from the contact list to open a 1‑on‑1 conversation.
4. **Create group** – Click “New Group”, select participants, give it a name.
5. **Send a message** – Type in the input box, press enter or click send. You will see a pending indicator, then a single checkmark (delivered), and a double checkmark (read).
6. **Share files** – Click the attachment icon, choose an image or document – the file uploads to Storage and a link appears as a message.
7. **Typing indicator** – When the other person starts typing, you will see “typing…” below the chat header.
8. **Notifications** – If you allow notifications, you will receive push alerts even when the tab is not active.
9. **Profile** – Click on your avatar to update your display name and profile picture.

## 🛠️ Advanced Customization

- **Theming** – Replace Tailwind classes or edit `style.css` to match your brand colors.
- **Offline support** – Firestore already provides offline persistence; you can enable it explicitly.
- **Message reactions** – Extend the messages sub‑collection with a `reactions` map.
- **Voice messages** – Use the MediaRecorder API and upload short audio clips to Storage.

## 🧪 Troubleshooting

| Issue | Possible fix |
|-------|---------------|
| Notifications not working | Ensure `firebase-messaging-sw.js` is registered, browser permissions are granted, and FCM is enabled. |
| Read receipts not appearing | Verify that the recipient has updated the `readAt` field on the message document (check your `app.js` logic). |
| Typing indicator flickers | Adjust the debounce timeout in the `onTyping` handler (e.g., 500ms). |
| Firestore rules block reads | Switch back to test mode temporarily to debug, then tighten rules. |

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

MIT – free to use, modify, and distribute.

## 🙏 Acknowledgements

- [Firebase Documentation](https://firebase.google.com/docs)

