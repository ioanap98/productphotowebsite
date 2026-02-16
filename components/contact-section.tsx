'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {  Mail, Instagram, Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactSection() {
  const [result, setResult] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@epitomecreatives.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setResult('Sending…')

    // Gather all the fields from the form
    const form = e.currentTarget
    const formData = new FormData(form)
    // Your Web3Forms access key
    formData.append('access_key', '66f9c46a-07d4-4e4e-b2e4-1e8da31cf793')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()

      if (json.success) {
        setResult('Thank you! Your message has been sent.')
        form.reset()
      } else {
        console.error('Web3Forms error', json)
        setResult('Oops! Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Fetch error', err)
      setResult('Network error. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  const steps = [
    {
      number: 1,
      title: 'Inquiry & Brief',
      description:
        'Share details about your product, brand, and goals - via the form, email, or a short call.',
    },
    {
      number: 2,
      title: 'Custom Proposal',
      description:
        'You’ll receive a clear proposal outlining deliverables, timeline, and pricing.',
    },
    {
      number: 3,
      title: 'Shoot & Edit',
      description:
        'Once confirmed, we plan and execute the shoot, followed by careful editing and retouching.',
    },
    {
      number: 4,
      title: 'Delivery',
      description:
        'Final images are delivered via a secure online gallery, ready for web and social use.',
    },
  ]

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Ready to Elevate Your Product Visuals?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share a few details about your product and brand. We’ll come back to you with a clear proposal and next steps.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-light mb-4">
              Tell Us About Your Project
            </h3>
            <p className="text-gray-600 mb-8">
              Tell us about your products and we'll create a custom photography package for your brand.
            </p>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="Your Name *"
                  required
                  className="border-gray-300 focus:border-black"
                />
                <Input
                  name="company"
                  placeholder="Company/Brand Name"
                  className="border-gray-300 focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  className="border-gray-300 focus:border-black"
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="border-gray-300 focus:border-black"
                />
              </div>

              <div>
                <select
                  name="projectType"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-black"
                >
                  <option value="">Select service *</option>
                  <option value="product-photography">
                    Product Photography
                  </option>
                  <option value="lifestyle">
                    Lifestyle Shots
                  </option>
                  <option value="product-videos">
                    Video & Motion Content
                  </option>
                  <option value="complete-package">
                    Complete Package (Photos + Video)
                  </option>
                  <option value="not-sure">
                    Not sure - need consultation
                  </option>
                </select>
              </div>

              <Textarea
                name="projectDetails"
                placeholder="Describe your products, brand style..."
                required
                className="border-gray-300 focus:border-black"
                rows={4}
              />

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-black text-white hover:bg-gray-800"
                size="lg"
              >
                {submitting ? 'Sending…' : 'Request a Quote'}
              </Button>

              {result && (
                <p
                  className={`mt-4 text-center ${
                    result.includes('Thank')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {result}
                </p>
              )}
            </motion.form>
          </motion.div>

          {/* Steps & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-light mb-8">How It Works</h3>
            <div className="space-y-6 mb-12">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                    {step.number}
                  </div>
                  <div>
                    <div className="font-medium">{step.title}</div>
                    <div className="text-gray-600">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-medium mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5" />
                <span>hello@epitomecreatives.com</span>
                <button
                  onClick={copyEmail}
                  className="ml-2 p-1.5 rounded hover:bg-gray-100 transition-colors"
                  title="Copy email"
                >
                  {emailCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="w-5 h-5" />
                <a
                  href="https://www.instagram.com/epitome.creatives/"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @epitome.creatives
                </a>
              </div>
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
