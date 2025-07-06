import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import { contactSchema } from '../utils/validators';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: Implement contact form submission
      console.log('Contact form data:', data);
      toast.success('Thank you for your message! We\'ll get back to you soon.');
      reset();
    } catch (error: any) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: 'Address',
      details: [
        'Hirable Beauty Products',
        '123 Beauty Street, Fashion District',
        'Mumbai, Maharashtra 400001',
        'India'
      ]
    },
    {
      icon: PhoneIcon,
      title: 'Phone',
      details: [
        '+91 1800-123-4567',
        '+91 22-1234-5678',
        'WhatsApp: +91 98765-43210'
      ]
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: [
        'support@hirablebeauty.com',
        'orders@hirablebeauty.com',
        'careers@hirablebeauty.com'
      ]
    },
    {
      icon: ClockIcon,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 8:00 PM',
        'Saturday: 10:00 AM - 6:00 PM',
        'Sunday: 11:00 AM - 5:00 PM',
        'All times are IST'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How can I track my order?',
      answer: 'You can track your order by logging into your account and visiting the "Orders" section, or by using the tracking number sent to your email.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unopened products. Please visit our Returns page for detailed information.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only ship within India. We\'re working on expanding our shipping options.'
    },
    {
      question: 'How do I use the AI beauty assistant?',
      answer: 'Click on the chat icon in the bottom right corner of any page to start a conversation with our AI beauty assistant.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our products or services? We're here to help! 
              Our beauty experts are ready to assist you with personalized recommendations and support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-lg"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible. 
                For urgent matters, please call us directly.
              </p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="Enter your first name"
                    {...register('firstName')}
                    error={errors.firstName?.message}
                    required
                  />
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Enter your last name"
                    {...register('lastName')}
                    error={errors.lastName?.message}
                    required
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  error={errors.email?.message}
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register('phone')}
                  error={errors.phone?.message}
                  required
                />

                <Input
                  label="Subject"
                  type="text"
                  placeholder="What is this about?"
                  {...register('subject')}
                  error={errors.subject?.message}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    {...register('message')}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" size="lg" fullWidth>
                  Send Message
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-pink-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Need immediate assistance?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our AI beauty assistant is available 24/7 to help with product recommendations, 
                  ingredient questions, and more.
                </p>
                <Button variant="outline" size="sm">
                  Chat Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;