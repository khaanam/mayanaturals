interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

class RazorpayService {
  private isScriptLoaded = false;

  async loadRazorpayScript(): Promise<boolean> {
    if (this.isScriptLoaded) return true;

    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        this.isScriptLoaded = true;
        resolve(true);
      };
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async createOrder(amount: number, currency: string = 'INR'): Promise<{ orderId: string; amount: number }> {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate creating an order
      const orderId = `order_${Date.now()}`;
      
      return {
        orderId,
        amount: amount * 100 // Razorpay expects amount in paise
      };
    } catch (error) {
      throw new Error('Failed to create order');
    }
  }

  async initiatePayment(options: {
    amount: number;
    currency?: string;
    orderId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    onSuccess: (response: any) => void;
    onFailure: (error: any) => void;
    onDismiss?: () => void;
  }): Promise<void> {
    const isLoaded = await this.loadRazorpayScript();
    
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    const razorpayOptions: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1234567890', // Use test key for demo
      amount: options.amount,
      currency: options.currency || 'INR',
      name: 'Maya Naturals',
      description: 'Beauty Products Purchase',
      order_id: options.orderId,
      handler: (response: any) => {
        options.onSuccess(response);
      },
      prefill: {
        name: options.customerName,
        email: options.customerEmail,
        contact: options.customerPhone
      },
      theme: {
        color: '#359a5c'
      },
      modal: {
        ondismiss: () => {
          if (options.onDismiss) {
            options.onDismiss();
          }
        }
      }
    };

    try {
      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.on('payment.failed', (response: any) => {
        options.onFailure(response.error);
      });
      razorpay.open();
    } catch (error) {
      options.onFailure(error);
    }
  }

  async verifyPayment(paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): Promise<boolean> {
    try {
      // In a real app, this would verify the payment signature on your backend
      // For demo purposes, we'll simulate successful verification
      console.log('Verifying payment:', paymentData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  getPaymentMethods(): Array<{ id: string; name: string; description: string; icon: string }> {
    return [
      {
        id: 'card',
        name: 'Credit/Debit Card',
        description: 'Visa, Mastercard, RuPay',
        icon: '💳'
      },
      {
        id: 'netbanking',
        name: 'Net Banking',
        description: 'All major banks supported',
        icon: '🏦'
      },
      {
        id: 'upi',
        name: 'UPI',
        description: 'Google Pay, PhonePe, Paytm',
        icon: '📱'
      },
      {
        id: 'wallet',
        name: 'Wallets',
        description: 'Paytm, Mobikwik, Freecharge',
        icon: '👛'
      },
      {
        id: 'emi',
        name: 'EMI',
        description: 'No cost EMI available',
        icon: '📊'
      }
    ];
  }
}

export const razorpayService = new RazorpayService();
export default razorpayService;