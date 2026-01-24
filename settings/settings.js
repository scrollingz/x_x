import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  updateEmail,
  updatePassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDHwL_6mDDYHDh6mQA8ivSG6cRi6Vx8oWA",
  authDomain: "x-x-x-x-x-x-x.firebaseapp.com",
  projectId: "x-x-x-x-x-x-x",
  storageBucket: "x-x-x-x-x-x-x.firebasestorage.app",
  messagingSenderId: "869034159472",
  appId: "1:869034159472:web:c7335dc099b4a7108873b5"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Elements
const bgInput = document.getElementById("bg-color");
const saveBtn = document.getElementById("save-settings");
const logoutBtn = document.getElementById("logout-btn");
const msg = document.getElementById("settings-msg");

// Auth state
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/login";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));
  if (snap.exists() && snap.data().bgColor) {
    document.body.style.background = snap.data().bgColor;
    bgInput.value = snap.data().bgColor;
  }
});

// Save settings
saveBtn.addEventListener("click", async () => {
  msg.textContent = "";
  msg.className = "error-msg";

  const user = auth.currentUser;
  if (!user) return;

  try {
    const newEmail = document.getElementById("new-email").value.trim();
    const newPass = document.getElementById("new-password").value;
    const newUsername = document.getElementById("new-username").value.trim();
    const bgColor = bgInput.value;

    if (newEmail) await updateEmail(user, newEmail);
    if (newPass) await updatePassword(user, newPass);

    await setDoc(
      doc(db, "users", user.uid),
      {
        username: newUsername || undefined,
        bgColor,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );

    msg.className = "success-msg";
    msg.textContent = "Settings updated successfully!";
  } catch (e) {
    msg.textContent = e.message;
  }
});

// Live background preview
bgInput.addEventListener("input", () => {
  document.body.style.background = bgInput.value;
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "/login";
});
