import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  CreditCardIcon, 
  TruckIcon, 
  ShieldCheckIcon,
  MapPinIcon,
  PlusIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { addressSchema } from '../utils/validators';
import { formatCurrency } from '../utils/formatters';
import { razorpayService } from '../services/razorpay';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
  notes?: string;
}

const Checkout: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      paymentMethod: 'razorpay'
    }
  });

  // Mock saved addresses
  const savedAddresses = [
    {
      id: '1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      phone: '9876543210',
      addressLine1: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      firstName: 'John',
      lastName: 'Doe',
      phone: '9876543210',
      addressLine1: '456 Business Park',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      isDefault: false
    }
  ];

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'Cards, UPI, Net Banking, Wallets',
      icon: CreditCardIcon
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive',
      icon: TruckIcon
    }
  ];

  const onSubmit = async (data: CheckoutFormData) => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsProcessing(true);
    
    try {
      if (data.paymentMethod === 'razorpay') {
        // Create Razorpay order
        const { orderId, amount } = await razorpayService.createOrder(cart.total);
        
        // Initiate Razorpay payment
        await razorpayService.initiatePayment({
          amount,
          orderId,
          customerName: `${data.firstName} ${data.lastName}`,
          customerEmail: user?.email || '',
          customerPhone: data.phone,
          onSuccess: async (response) => {
            // Verify payment
            const isVerified = await razorpayService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (isVerified) {
              // Create order in database
              const orderData = {
                items: cart.items,
                shippingAddress: data,
                paymentMethod: data.paymentMethod,
                paymentId: response.razorpay_payment_id,
                total: cart.total,
                notes: data.notes
              };

              console.log('Order placed:', orderData);
              
              clearCart();
              toast.success('Order placed successfully!');
              navigate('/orders');
            } else {
              toast.error('Payment verification failed');
            }
            setIsProcessing(false);
          },
          onFailure: (error) => {
            console.error('Payment failed:', error);
            toast.error('Payment failed. Please try again.');
            setIsProcessing(false);
          },
          onDismiss: () => {
            setIsProcessing(false);
          }
        });
      } else {
        // Cash on Delivery
        const orderData = {
          items: cart.items,
          shippingAddress: data,
          paymentMethod: data.paymentMethod,
          total: cart.total,
          notes: data.notes
        };

        console.log('COD Order placed:', orderData);
        
        clearCart();
        toast.success('Order placed successfully!');
        navigate('/orders');
        setIsProcessing(false);
      }
    } catch (error: any) {
      toast.error('Failed to place order. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
    const address = savedAddresses.find(addr => addr.id === addressId);
    if (address) {
      // Auto-fill form with selected address
      Object.entries(address).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'type' && key !== 'isDefault') {
          // Form auto-fill would go here
        }
      });
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <TruckIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to proceed with checkout</p>
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: 'Shipping', icon: MapPinIcon },
              { step: 2, title: 'Payment', icon: CreditCardIcon },
              { step: 3, title: 'Review', icon: CheckCircleIcon }
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= item.step 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > item.step ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <item.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step >= item.step ? 'text-primary-600' : 'text-gray-600'
                }`}>
                  {item.title}
                </span>
                {item.step < 3 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    step > item.step ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Shipping Address */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
                  
                  {/* Saved Addresses */}
                  {savedAddresses.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Saved Addresses</h3>
                      <div className="space-y-3">
                        {savedAddresses.map((address) => (
                          <div
                            key={address.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedAddress === address.id
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleAddressSelect(address.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-900">
                                    {address.firstName} {address.lastName}
                                  </span>
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    {address.type}
                                  </span>
                                  {address.isDefault && (
                                    <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {address.addressLine1}, {address.city}, {address.state} - {address.pincode}
                                </p>
                                <p className="text-sm text-gray-600">{address.phone}</p>
                              </div>
                              <input
                                type="radio"
                                name="selectedAddress"
                                checked={selectedAddress === address.id}
                                onChange={() => handleAddressSelect(address.id)}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Address Form */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-900">Add New Address</h3>
                      <button
                        type="button"
                        className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                      >
                        <PlusIcon className="h-4 w-4 inline mr-1" />
                        Add Address
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        type="text"
                        placeholder="Enter first name"
                        {...register('firstName')}
                        error={errors.firstName?.message}
                        required
                      />
                      <Input
                        label="Last Name"
                        type="text"
                        placeholder="Enter last name"
                        {...register('lastName')}
                        error={errors.lastName?.message}
                        required
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Phone Number"
                          type="tel"
                          placeholder="Enter phone number"
                          {...register('phone')}
                          error={errors.phone?.message}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          label="Address Line 1"
                          type="text"
                          placeholder="House/Flat number, Street name"
                          {...register('addressLine1')}
                          error={errors.addressLine1?.message}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          label="Address Line 2"
                          type="text"
                          placeholder="Area, Landmark (Optional)"
                          {...register('addressLine2')}
                          error={errors.addressLine2?.message}
                        />
                      </div>
                      <Input
                        label="City"
                        type="text"
                        placeholder="Enter city"
                        {...register('city')}
                        error={errors.city?.message}
                        required
                      />
                      <Input
                        label="State"
                        type="text"
                        placeholder="Enter state"
                        {...register('state')}
                        error={errors.state?.message}
                        required
                      />
                      <Input
                        label="Pincode"
                        type="text"
                        placeholder="Enter pincode"
                        {...register('pincode')}
                        error={errors.pincode?.message}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button type="submit" size="lg">
                      Continue to Payment
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                  
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <method.icon className="h-6 w-6 text-gray-600" />
                            <div>
                              <p className="font-medium text-gray-900">{method.name}</p>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Razorpay Payment Methods */}
                  {paymentMethod === 'razorpay' && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-3">Available Payment Options</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {razorpayService.getPaymentMethods().map((method) => (
                          <div key={method.id} className="flex items-center space-x-2 text-sm text-blue-800">
                            <span>{method.icon}</span>
                            <span>{method.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any special instructions for delivery..."
                      {...register('notes')}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      size="lg"
                    >
                      Back to Shipping
                    </Button>
                    <Button type="submit" size="lg">
                      Review Order
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Order Review */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>
                  
                  {/* Order Items */}
                  <div className="border-b pb-6 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {cart.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.product.images?.[0]?.url || 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-900">
                            {formatCurrency(item.totalPrice)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center space-x-2 text-green-600 mb-6">
                    <ShieldCheckIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">Secure Checkout</span>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      size="lg"
                    >
                      Back to Payment
                    </Button>
                    <Button
                      type="submit"
                      isLoading={isProcessing}
                      size="lg"
                      className="min-w-[150px]"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.totalItems} items)</span>
                  <span className="text-gray-900">{formatCurrency(cart.subtotal)}</span>
                </div>
                
                {cart.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-{formatCurrency(cart.discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {cart.subtotal >= 999 ? 'Free' : formatCurrency(50)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST)</span>
                  <span className="text-gray-900">{formatCurrency(cart.tax)}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">{formatCurrency(cart.total)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <TruckIcon className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {cart.subtotal >= 999 ? 'Free Delivery' : 'Standard Delivery'}
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Expected delivery: 3-5 business days
                </p>
              </div>

              {/* Free Shipping Banner */}
              {cart.subtotal < 999 && (
                <div className="bg-primary-50 rounded-lg p-4">
                  <p className="text-sm text-primary-600">
                    Add {formatCurrency(999 - cart.subtotal)} more to get free shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;