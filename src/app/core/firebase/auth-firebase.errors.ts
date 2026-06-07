const FIREBASE_AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled.',
  'auth/popup-blocked': 'Sign-in popup was blocked by the browser.',
  'auth/account-exists-with-different-credential':
    'An account already exists with the same email but different sign-in method.',
};

export function resolveFirebaseAuthError(error: unknown, fallback: string): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = String((error as { code: string }).code);
    const mapped = FIREBASE_AUTH_ERROR_MESSAGES[code];

    if (mapped) {
      return mapped;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
