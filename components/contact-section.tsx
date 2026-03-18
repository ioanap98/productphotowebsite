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
    <section id="contact" className="brand-section-b py-24">
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
          {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share a few details about your product and brand. We’ll come back to you with a clear proposal and next steps.
          </p> */}
          <motion.div
            className="brand-gradient-line mx-auto mt-6 h-px w-24"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            className="brand-soft-panel rounded-3xl p-8 md:p-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-light mb-4">
              Start Your Project
            </h3>
            <p className="text-gray-600 mb-8">
              Share a bit about your product and what you’re looking for, and I’ll get back to you with a tailored approach for your brand.
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
                  className="border-white/70 bg-white/80"
                />
                <Input
                  name="company"
                  placeholder="Company/Brand Name"
                  className="border-white/70 bg-white/80"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  className="border-white/70 bg-white/80"
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="border-white/70 bg-white/80"
                />
              </div>

              <div>
                <select
                  name="projectType"
                  required
                  className="w-full rounded-md border border-white/70 bg-white/80 p-3 focus:border-purple-300 focus:outline-none focus:ring-4 focus:ring-fuchsia-100"
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
                className="border-white/70 bg-white/80"
                rows={4}
              />

              <Button
                type="submit"
                disabled={submitting}
                className="brand-gradient-button w-full border-0 text-white"
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
            className="brand-soft-panel rounded-3xl p-8 md:p-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-light mb-8">How It Works</h3>
            <div className="space-y-6 mb-12">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg shadow-fuchsia-200/70">
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
                <Mail className="h-5 w-5 text-purple-700" />
                <span>hello@epitomecreatives.com</span>
                <button
                  onClick={copyEmail}
                  className="ml-2 rounded p-1.5 transition-all hover:bg-gradient-to-r hover:from-purple-100 hover:via-pink-100 hover:to-blue-100"
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
                <Instagram className="h-5 w-5 text-pink-600" />
                <a
                  href="https://www.instagram.com/epitome.creatives/"
                  className="transition-colors hover:text-purple-700 hover:underline"
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
