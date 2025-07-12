import { useMutation } from '@tanstack/react-query';
import { account } from '../appwrite';

export function useSignIn() {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      // Appwrite v8+ login
      return await account.createEmailPasswordSession({ email, password });
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: async ({ email, password, name }: { email: string; password: string; name: string }) => {
      // Appwrite v8+ signup
      return await account.create({ userId: 'unique()', email, password, name });
    },
  });
} 