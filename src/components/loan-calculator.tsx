
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Calendar, Percent, Landmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { LandListing } from '@/types';

const formSchema = z.object({
  propertyPrice: z.number().min(100000, 'Price must be at least Kes. 100,000'),
  downPaymentPercentage: z.number().min(10, 'Minimum 10% deposit required').max(100),
  downPayment: z.number().min(10000, 'Down payment too low'),
  interestRate: z.number().min(0, 'Rate must be positive').max(20, 'Rate seems too high'),
  loanTerm: z.number().min(1, 'Term must be at least 1 month').max(36, 'Term cannot exceed 36 months'),
});

type FormData = z.infer<typeof formSchema>;

type CalculationResults = {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
};

type LoanCalculatorProps = {
  listing?: LandListing;
  vehicle?: any;
};

export function LoanCalculator({ listing, vehicle }: LoanCalculatorProps) {
  const [results, setResults] = useState<CalculationResults | null>(null);

  const initialPrice = listing?.price || vehicle?.price || 1000000;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyPrice: initialPrice,
      downPaymentPercentage: 10,
      downPayment: initialPrice * 0.1,
      interestRate: 0, // Many Kenyan deals are 0% interest for cash/short term
      loanTerm: 12,
    },
  });

  const { setValue, getValues } = form;

  useEffect(() => {
    const activePrice = listing?.price || vehicle?.price;
    if (activePrice) {
      form.reset({
        propertyPrice: activePrice,
        downPaymentPercentage: 10,
        downPayment: activePrice * 0.1,
        interestRate: 0,
        loanTerm: 12,
      });
    }
  }, [listing, vehicle, form]);
  
  const onSubmit = (data: FormData) => {
    const { propertyPrice, downPayment, interestRate, loanTerm } = data;
    const principal = propertyPrice - downPayment;
    
    // Simplistic installment calculation for real estate (often linear in Kenya)
    const totalInterest = principal * (interestRate / 100) * (loanTerm / 12);
    const totalPrincipalAndInterest = principal + totalInterest;
    const monthlyPayment = totalPrincipalAndInterest / loanTerm;

    setResults({
      monthlyPayment,
      totalInterest,
      totalAmount: totalPrincipalAndInterest + downPayment
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  const handleDownPaymentPercentageChange = (value: number | number[]) => {
    const percentage = Array.isArray(value) ? value[0] : value;
    setValue('downPaymentPercentage', percentage, { shouldValidate: true });
    const price = getValues('propertyPrice');
    setValue('downPayment', Math.round(price * (percentage / 100)), { shouldValidate: true });
  };
  
  const handleDownPaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.valueAsNumber || 0;
    setValue('downPayment', amount, { shouldValidate: true });
    const price = getValues('propertyPrice');
    if (price > 0) {
        setValue('downPaymentPercentage', parseFloat(((amount / price) * 100).toFixed(2)), { shouldValidate: true });
    }
  };

  return (
      <Card className="border-primary/20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-xl">Land Financing Calculator</CardTitle>
              <CardDescription>Calculate your monthly installments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="propertyPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Price (Kes.)</FormLabel>
                       <FormControl>
                        <Input {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber || 0)} readOnly={!!listing}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="downPaymentPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deposit ({field.value}%)</FormLabel>
                      <Slider
                        value={[field.value]}
                        onValueChange={handleDownPaymentPercentageChange}
                        min={10}
                        max={100}
                        step={5}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="downPayment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deposit Amount (Kes.)</FormLabel>
                      <FormControl>
                          <Input {...field} type="number" onChange={handleDownPaymentAmountChange}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="interestRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interest Rate (% p.a.)</FormLabel>
                          <FormControl>
                              <Input {...field} type="number" step="0.1" onChange={e => field.onChange(e.target.valueAsNumber || 0)}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="loanTerm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Term (Months)</FormLabel>
                          <FormControl>
                              <Input {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber || 0)}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full bg-primary text-primary-foreground">
                    Calculate Installments
                </Button>
            </CardFooter>
          </form>
        </Form>
        {results && (
          <div className="p-6 pt-0">
            <Separator className="my-6" />
            <h3 className="text-lg font-bold mb-4 text-center">Estimated Payment Plan</h3>
            <div className="grid grid-cols-1 gap-3">
                <div className="bg-secondary/50 p-4 rounded-lg flex justify-between items-center">
                    <span className="text-sm font-medium">Monthly Installment</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(results.monthlyPayment)}</span>
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg flex justify-between items-center text-xs">
                    <span>Total Amount Paid</span>
                    <span className="font-semibold">{formatCurrency(results.totalAmount)}</span>
                </div>
            </div>
          </div>
        )}
      </Card>
  );
}
