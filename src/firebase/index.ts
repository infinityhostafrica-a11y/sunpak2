'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth as getAuthInstance } from 'firebase/auth';
import { getFirestore as getFirestoreInstance } from 'firebase/firestore';
import { getStorage as getStorageInstance } from 'firebase/storage';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  let firebaseApp: FirebaseApp;
  
  if (!getApps().length) {
    // Force usage of config to ensure storageBucket and other vital fields are present
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }

  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  // Explicitly provide the storage bucket during service instantiation
  // to ensure 'storage/no-default-bucket' errors are avoided.
  return {
    firebaseApp,
    auth: getAuthInstance(firebaseApp),
    firestore: getFirestoreInstance(firebaseApp, firebaseConfig.firestoreDatabaseId),
    storage: getStorageInstance(firebaseApp, firebaseConfig.storageBucket)
  };
}

// Export SDK getter aliases
export const getAuth = getAuthInstance;
export const getFirestore = getFirestoreInstance;
export const getStorage = getStorageInstance;

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
