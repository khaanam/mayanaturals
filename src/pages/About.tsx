import React from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  HeartIcon, 
  GlobeAltIcon, 
  UserGroupIcon,
  ShieldCheckIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const About: React.FC = () => {
  const values = [
    {
      icon: HeartIcon,
      title: 'Passion for Beauty',
      description: 'We believe beauty is about feeling confident and expressing your unique self.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Authenticity',
      description: 'Only genuine products from authorized brands with quality guarantees.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Inclusive Beauty',
      description: 'Products for all skin types, tones, and beauty preferences across India.'
    },
    {
      icon: UserGroupIcon,
      title: 'Community First',
      description: 'Building a supportive community of beauty enthusiasts sharing knowledge.'
    }
  ];

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      bio: 'Former beauty industry executive with 15+ years of experience.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Ananya Patel',
      role: 'Chief Product Officer',
      bio: 'Beauty expert and product developer passionate about innovation.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Kavya Reddy',
      role: 'Head of Customer Experience',
      bio: 'Dedicated to creating exceptional customer experiences.',
      image: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Founded',
      description: 'Hirable Beauty was founded with a mission to revolutionize beauty shopping in India.'
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Launched our AI-powered beauty assistant for personalized recommendations.'
    },
    {
      year: '2024',
      title: 'Multi-language Support',
      description: 'Added support for 11 Indian regional languages to serve customers better.'
    },
    {
      year: '2024',
      title: 'Pan-India Expansion',
      description: 'Expanded delivery to over 500 cities across India.'
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
              About Hirable Beauty
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're on a mission to make premium beauty accessible to everyone in India. 
              Through innovative technology and authentic products, we're transforming how 
              people discover and shop for beauty.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <SparklesIcon className="h-5 w-5 mr-2 text-pink-500" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center">
                <TruckIcon className="h-5 w-5 mr-2 text-pink-500" />
                <span>500+ Cities</span>
              </div>
              <div className="flex items-center">
                <UserGroupIcon className="h-5 w-5 mr-2 text-pink-500" />
                <span>1M+ Happy Customers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Hirable Beauty was born from a simple observation: beauty shopping in India 
                was fragmented, confusing, and often disappointing. Customers struggled to find 
                authentic products suited to their unique skin types and concerns.
              </p>
              <p className="text-gray-600 mb-4">
                We saw an opportunity to leverage artificial intelligence and deep beauty 
                expertise to create a more personalized, trustworthy shopping experience. 
                Our AI beauty assistant doesn't just recommend products—it understands your 
                unique beauty journey.
              </p>
              <p className="text-gray-600">
                Today, we're proud to serve customers across India with authentic products, 
                expert advice, and innovative technology that makes beauty accessible to everyone.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Beauty products"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-pink-500 text-white px-6 py-3 rounded-lg">
                <p className="text-sm font-medium">Trusted by 1M+ customers</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do, from product curation to customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-white p-6 rounded-lg shadow-md"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beauty experts, technologists, and customer advocates working together to revolutionize beauty shopping.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-white p-6 rounded-lg shadow-md"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-pink-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key milestones in our mission to transform beauty shopping in India.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start mb-8"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                  {milestone.year}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Beauty Community
            </h2>
            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
              Be part of our growing community of beauty enthusiasts across India. 
              Discover, learn, and share your beauty journey with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-medium hover:bg-pink-50 transition-colors">
                Shop Now
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-pink-600 transition-colors">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;