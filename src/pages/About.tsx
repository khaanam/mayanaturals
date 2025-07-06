import React from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  HeartIcon, 
  GlobeAltIcon, 
  UserGroupIcon,
  ShieldCheckIcon,
  TruckIcon,
  CheckCircleIcon,
  BeakerIcon,
  LeafIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const About: React.FC = () => {
  const values = [
    {
      icon: LeafIcon,
      title: '100% Organic Ingredients',
      description: 'Every herb is carefully sourced from certified organic farms. No synthetic additives, no artificial preservatives, just pure nature.'
    },
    {
      icon: BeakerIcon,
      title: 'Chemical-Free Promise',
      description: 'We\'ve eliminated all harmful chemicals from our formulations. No parabens, no sulfates, no synthetic fragrances - just natural goodness.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'ZED Certified',
      description: 'Our products carry the prestigious ZED certification, ensuring authenticity and quality in every bottle.'
    },
    {
      icon: SparklesIcon,
      title: '98% Proven Results',
      description: 'Based on customer feedback and independent testing, 98% of users see visible improvements within 30 days.'
    }
  ];

  const team = [
    {
      name: 'Dr. Maya Sharma',
      role: 'Founder & Chief Formulator',
      bio: 'Ayurvedic expert with 20+ years of experience in herbal beauty formulations.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Rajesh Patel',
      role: 'Head of Manufacturing',
      bio: 'Quality control specialist ensuring every product meets our highest standards.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Priya Reddy',
      role: 'Customer Experience Director',
      bio: 'Dedicated to creating exceptional customer experiences and natural beauty education.',
      image: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ];

  const milestones = [
    {
      year: '2011',
      title: 'Founded',
      description: 'Maya Naturals was founded with a mission to bring ancient herbal wisdom to modern beauty routines.'
    },
    {
      year: '2013',
      title: 'UDYAM Registration',
      description: 'Achieved UDYAM registration (MH-04-0160386) for our manufacturing facility in Maharashtra.'
    },
    {
      year: '2016',
      title: 'ZED Certification',
      description: 'Received prestigious ZED certification for zero defect, zero effect manufacturing.'
    },
    {
      year: '2019',
      title: '50,000+ Customers',
      description: 'Reached milestone of serving 50,000+ satisfied customers across India.'
    },
    {
      year: '2022',
      title: '98% Results Proven',
      description: 'Independent studies confirmed 98% customer satisfaction and visible results.'
    },
    {
      year: '2024',
      title: 'Continued Excellence',
      description: 'Expanding our natural product range while maintaining our commitment to purity.'
    }
  ];

  const certifications = [
    {
      name: 'ZED Certified',
      description: 'Zero Effect, Zero Defect - Government of India certification for quality excellence',
      icon: ShieldCheckIcon
    },
    {
      name: 'UDYAM Registered',
      description: 'UDYAM-MH-04-0160386 - Official MSME registration for manufacturing excellence',
      icon: CheckCircleIcon
    },
    {
      name: 'Organic Certified',
      description: 'Certified organic ingredients from trusted farms',
      icon: LeafIcon
    },
    {
      name: 'Cruelty-Free',
      description: 'No animal testing, ever',
      icon: HeartIcon
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Rooted in Nature, Trusted by Thousands
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Since 2011, Maya Naturals has been on a mission to bring the ancient wisdom of natural herbs 
              to modern beauty routines. Founded on the belief that true beauty comes from nature's purest ingredients.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <SparklesIcon className="h-5 w-5 mr-2 text-primary-500" />
                <span>13+ Years Excellence</span>
              </div>
              <div className="flex items-center">
                <UserGroupIcon className="h-5 w-5 mr-2 text-primary-500" />
                <span>50,000+ Happy Customers</span>
              </div>
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 mr-2 text-primary-500" />
                <span>98% Proven Results</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <p className="text-gray-600 mb-4">
                What started as a small venture in 2011 has grown into a trusted name in natural beauty. 
                We've remained committed to our core principles throughout our journey.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">No Synthetic Ingredients</h4>
                    <p className="text-gray-600 text-sm">Every product is crafted with 100% natural herbs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Zero Chemicals</h4>
                    <p className="text-gray-600 text-sm">Our formulations are completely free from harmful chemicals</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Proven Results</h4>
                    <p className="text-gray-600 text-sm">98% of our customers report visible improvements</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Certified Quality</h4>
                    <p className="text-gray-600 text-sm">ZED certified for authenticity and quality</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Natural herbs and ingredients"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white px-6 py-3 rounded-lg">
                <p className="text-sm font-medium">Since 2011</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manufacturing Excellence */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Manufacturing Excellence</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Proudly manufactured by MAYA Naturals (UDYAM-MH-04-0160386) at our state-of-the-art facility in Aurangabad, Maharashtra.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-white p-6 rounded-lg shadow-md"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Maya Naturals?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to natural beauty goes beyond products – it's about creating a healthier, more sustainable future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Herbal experts, quality specialists, and customer advocates working together to bring you the best of nature.
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
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey Through the Years</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key milestones in our mission to transform natural beauty in India.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-primary-50 rounded-lg"
                >
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm">{milestone.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Promise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe your skin and hair deserve nothing but nature's best. That's why every Maya Naturals product 
              undergoes rigorous testing at our MAYA Naturals facility to ensure it meets our high standards of purity and effectiveness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">98%</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600 text-sm">Based on independent customer feedback and testing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">13+</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Years of Excellence</h3>
              <p className="text-gray-600 text-sm">Trusted by customers since 2011</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">0</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Harmful Chemicals</h3>
              <p className="text-gray-600 text-sm">100% natural, chemical-free formulations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Natural Beauty Community
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Be part of our growing community of natural beauty enthusiasts across India. 
              Discover, learn, and share your beauty journey with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors">
                Shop Natural Products
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
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