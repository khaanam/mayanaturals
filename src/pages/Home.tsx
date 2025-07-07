import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  ShieldCheckIcon, 
  TruckIcon, 
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  BeakerIcon,
  GlobeAltIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const trustBadges = [
    { icon: CheckCircleIcon, text: '100% Organic & Natural' },
    { icon: ShieldCheckIcon, text: 'Zero Synthetic Ingredients' },
    { icon: BeakerIcon, text: 'Chemical-Free Formula' },
    { icon: StarIcon, text: 'ZED Certified' },
    { icon: SparklesIcon, text: '98% Proven Results' },
    { icon: HeartIcon, text: 'Trusted Since 2011' },
    { icon: CheckCircleIcon, text: 'UDYAM Registered Manufacturing' },
    { icon: GlobeAltIcon, text: 'Made in Maharashtra, India' }
  ];

  const categories = [
    {
      name: 'Hair Care Collection',
      description: 'Nourish your hair with ancient herbal wisdom. Our chemical-free hair care range brings back your hair\'s natural strength and shine.',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      href: '/products?category=haircare',
      benefits: ['Promotes natural hair growth', 'Reduces hair fall by 85%', 'Eliminates dandruff naturally']
    },
    {
      name: 'Skin Care Collection',
      description: 'Embrace your skin\'s natural radiance with our organic skincare solutions. Pure herbs, pure results, pure confidence.',
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      href: '/products?category=skincare',
      benefits: ['Reduces acne by 92%', 'Improves skin texture', 'Natural anti-aging properties']
    },
    {
      name: 'Body Care Collection',
      description: 'Pamper your body with nature\'s finest ingredients. Our body care range nourishes and protects your skin naturally.',
      image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      href: '/products?category=bodycare',
      benefits: ['Deep moisturization', 'Natural detoxification', 'Gentle on sensitive skin']
    },
    {
      name: 'Herbal Products',
      description: 'Experience the power of traditional Ayurvedic herbs in modern formulations. Time-tested ingredients for contemporary beauty needs.',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      href: '/products?category=herbal',
      benefits: ['Ancient herbal wisdom', '100% natural ingredients', 'Holistic beauty approach']
    }
  ];

  const testimonials = [
    {
      name: 'Priya S.',
      location: 'Mumbai',
      rating: 5,
      comment: 'I\'ve been using Maya Naturals products for 2 years now. My hair has never been healthier! 100% natural and it shows.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Rahul K.',
      location: 'Delhi',
      rating: 5,
      comment: 'Finally found a skincare brand that actually works. My acne cleared up in just 3 weeks! Chemical-free really makes a difference.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Ananya M.',
      location: 'Bangalore',
      rating: 5,
      comment: 'Love that these products are completely organic. My sensitive skin has never felt better. Highly recommend Maya Naturals!',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const whyChooseUs = [
    {
      icon: GlobeAltIcon,
      title: '100% Organic Ingredients',
      description: 'Every herb is carefully sourced from certified organic farms. No synthetic additives, no artificial preservatives, just pure nature.'
    },
    {
      icon: BeakerIcon,
      title: 'Chemical-Free Promise',
      description: 'We\'ve eliminated all harmful chemicals from our formulations. No parabens, no sulfates, no synthetic fragrances.'
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Nature's Purity,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                  {' '}Your Beauty's Best Friend
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Since 2011, Maya Naturals has been crafting <strong>100% organic, chemical-free</strong> beauty solutions using only natural herbs. Experience the power of nature with <strong>98% proven results</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/products">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                    Discover Pure Beauty
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <div className="flex gap-3">
                  <Link to="/products?category=haircare">
                    <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                      Shop Hair Care
                    </Button>
                  </Link>
                  <Link to="/products?category=skincare">
                    <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                      Shop Skin Care
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=700&h=700&fit=crop"
                  alt="Natural Beauty Products"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-6 -right-6 bg-secondary-400 text-primary-800 px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                  98% Results
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                  Since 2011
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Trust Maya Naturals?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to purity, quality, and results has made us a trusted name in natural beauty for over a decade.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-4 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <badge.icon className="h-6 w-6 text-primary-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">{badge.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Natural Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the power of nature with our carefully curated collections of organic beauty products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                  <div className="space-y-2 mb-6">
                    {category.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircleIcon className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={category.href}>
                    <Button variant="outline" className="w-full group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all">
                      Explore Collection
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Maya Naturals?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to natural beauty goes beyond products – it's about creating a healthier, more sustainable future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:bg-primary-50 transition-colors"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Stories, Real Results</h2>
            <p className="text-gray-600">Join thousands of happy customers who trust Maya Naturals for their natural beauty needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Excellence Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Manufacturing Excellence</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Proudly manufactured by <strong>MAYA Naturals (UDYAM-MH-04-0160386)</strong> at our state-of-the-art facility in Aurangabad, Maharashtra. Our UDYAM-registered manufacturing unit ensures every product meets the highest quality standards while maintaining our commitment to eco-friendly production practices.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">UDYAM Registered Manufacturing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">ZED Certified Quality Standards</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">Eco-Friendly Production Practices</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">13+ Years of Excellence</span>
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
                src="https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Manufacturing facility"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 bg-primary-600 text-white px-6 py-3 rounded-lg">
                <p className="text-sm font-medium">UDYAM Registered</p>
                <p className="text-xs">MH-04-0160386</p>
              </div>
            </motion.div>
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
              Ready to Experience Nature's Power?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of beauty enthusiasts who trust Maya Naturals for their natural beauty journey. 
              Start your transformation today with our 100% organic products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Shop Natural Beauty
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary-600">
                  Learn Our Story
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-8 text-primary-100">
              <div className="flex items-center">
                <TruckIcon className="h-5 w-5 mr-2" />
                <span className="text-sm">Free Shipping ₹999+</span>
              </div>
              <div className="flex items-center">
                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                <span className="text-sm">30-Day Guarantee</span>
              </div>
              <div className="flex items-center">
                <SparklesIcon className="h-5 w-5 mr-2" />
                <span className="text-sm">98% Results</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;