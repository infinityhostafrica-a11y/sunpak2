'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Loader2, ShieldCheck, Chrome } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ADMIN_EMAIL = 'eternetnetworkskenya@gmail.com';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === ADMIN_EMAIL) {
        toast({
          title: 'Access Granted',
          description: 'Welcome back via Google authentication.',
        });
        router.push('/admin/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Unauthorized',
          description: 'This Google account does not have admin privileges.',
        });
        await auth.signOut();
      }
    } catch (error: any) {
      if (error.code !== 'auth/popup-closed-by-user') {
        toast({
          variant: 'destructive',
          title: 'Google Auth Error',
          description: error.message || 'Failed to sign in with Google.',
        });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  }

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    const auth = getAuth();
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      
      if (userCredential.user.email === ADMIN_EMAIL) {
        toast({
          title: 'Access Granted',
          description: 'Welcome back to the Super Admin portal.',
        });
        router.push('/admin/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Unauthorized',
          description: 'This account does not have administrator privileges.',
        });
        await auth.signOut();
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: 'Invalid credentials. Please verify your email and password.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black/5 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <ShieldCheck className="h-12 w-12 text-primary" />
          </div>
          <h2 className="font-headline text-3xl font-extrabold text-foreground">
            Super Admin Login
          </h2>
          <p className="mt-2 text-sm text-muted-foreground font-medium">
            Authorized Personnel Only — Sunpak Estate
          </p>
        </div>

        <Card className="border-primary/20 shadow-2xl bg-white">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl font-bold">Portal Access</CardTitle>
            <CardDescription>Use your authorized credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              variant="outline" 
              className="w-full h-11 border-gray-200 font-bold hover:bg-gray-50 flex items-center justify-center gap-3 transition-all"
              onClick={handleGoogleSignIn}
              disabled={isLoading || isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Chrome className="h-4 w-4 text-primary" />
              )}
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground font-bold">Or use password</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Admin Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
                          <Input 
                            {...field} 
                            placeholder="" 
                            className="pl-10 border-gray-200 focus:ring-primary h-11"
                            disabled={isLoading || isGoogleLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-primary" />
                          <Input 
                            {...field} 
                            type="password" 
                            placeholder="••••••••" 
                            className="pl-10 border-gray-200 focus:ring-primary h-11"
                            disabled={isLoading || isGoogleLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg shadow-lg transition-all active:scale-95" 
                  disabled={isLoading || isGoogleLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Login to Dashboard'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center gap-4">
          <Logo className="h-10 opacity-50 grayscale hover:grayscale-0 transition-all" />
          <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} Sunpak Estate. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
