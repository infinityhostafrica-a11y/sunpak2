import firebaseAppletConfig from '../../firebase-applet-config.json';

const config = firebaseAppletConfig || {};

export const firebaseConfig = {
  projectId: config.projectId || "project-4216dd3d-5288-4d40-ab5",
  appId: config.appId || "1:834553201465:web:4ab9fd4d8b3496cda59ee8",
  apiKey: config.apiKey || "AIzaSyBVbNBnvyf3c2WymZGMH9MzZsV1jDNlWdE",
  authDomain: config.authDomain || "project-4216dd3d-5288-4d40-ab5.firebaseapp.com",
  storageBucket: config.storageBucket || "project-4216dd3d-5288-4d40-ab5.firebasestorage.app",
  messagingSenderId: config.messagingSenderId || "834553201465",
  measurementId: config.measurementId || "",
  firestoreDatabaseId: config.firestoreDatabaseId || "ai-studio-sunpak2final-8409b2a9-f402-462a-b819-12c4518a365d"
};

