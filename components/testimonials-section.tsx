"use client"

import { Camera, Clock, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"

const benefits = [
  {
    icon: Camera,
    title: "Detail-Focused Visuals",
    description: "Every image is built around your product -   its form, texture, and details - to ensure it’s presented clearly and consistently across your website and marketing channels.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "A clear process and structured workflow allow most projects to be delivered within 1–2 weeks, without compromising on quality or consistency.",
  },
  {
    icon: Users,
    title: "Structured Collaboration",
    description: "You’re involved where it matters. Each project begins with a clear brief and visual direction, ensuring the final imagery aligns with your brand and objectives.",
  },
  {
    icon: Zap,
    title: "Results-Driven",
    description: "Images are delivered ready for e-commerce, social media, and campaigns - designed to support engagement, trust, and a cohesive brand presence online.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 1, 1] as [number, number, number, number], // cubic-bezier for easeOut
    },
  },
}

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: 360,
    backgroundColor: "#374151",
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 1, 1] as [number, number, number, number], // cubic-bezier for easeOut
    },
  },
}

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">How We Approach Product Photography</h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            At Epitome Creatives, we elevate your brand through striking visual narratives that transform products into must-have experiences. 
          </motion.p>
          <motion.div
            className="w-24 h-px bg-black mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm group"
              variants={cardVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="mb-6">
                <motion.div
                  className="w-16 h-16 bg-black rounded-lg flex items-center justify-center"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
              </div>

              <motion.h3
                className="text-xl font-medium mb-4"
                whileHover={{ color: "#374151" }}
                transition={{ duration: 0.3 }}
              >
                {benefit.title}
              </motion.h3>

              <motion.p
                className="text-gray-600 leading-relaxed"
                whileHover={{ color: "#4B5563" }}
                transition={{ duration: 0.3 }}
              >
                {benefit.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
