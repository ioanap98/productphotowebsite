"use client"

import { Camera, Users, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    icon: Camera,
    title: "E-commerce Photography",
    description:
      "Crisp, detailed product images designed for e-commerce. Clean compositions that showcase quality and build buyer confidence.",
  },
  {
    icon: Users,
    title: "Lifestyle Photography",
    description:
      "Products photographed in context. Natural scenes that help customers visualise use and connect emotionally with your brand.",
  },
  {
    icon: RotateCcw,
    title: "Video & Motion",
    description:
      "Dynamic short-form content for social and product pages. Engaging visuals that stop the scroll and drive conversions.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
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
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 1, 1] as [number, number, number, number], // cubic-bezier for easeOut
    },
  },
}

export default function ServicesSection() {
  return (
    <section id="services" className="brand-section-a-soft py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">Services</h2>
          <motion.div
            className="brand-gradient-line mx-auto h-px w-24"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 flex justify-center">
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 shadow-lg shadow-fuchsia-100/70 transition-shadow duration-500 group-hover:shadow-[0_18px_40px_rgba(168,85,247,0.16)]"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <service.icon className="h-10 w-10 text-purple-700" />
                </motion.div>
              </div>
              <motion.h3
                className="text-2xl font-light mb-4"
                whileHover={{ color: "#7E22CE" }}
                transition={{ duration: 0.3 }}
              >
                {service.title}
              </motion.h3>
              <motion.p
                className="text-gray-600 leading-relaxed"
                whileHover={{ color: "#6B21A8" }}
                transition={{ duration: 0.3 }}
              >
                {service.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="brand-soft-panel mx-auto max-w-4xl rounded-2xl p-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-light mb-6">The Impact of Professional Visuals</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { number: "67%", text: "Higher conversion with quality product imagery" },
                { number: "3x", text: "More engagement on social platforms" },
                { number: "40%", text: "Fewer returns with clear, detailed photos" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    className="brand-gradient-text mb-2 text-4xl font-bold"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-gray-600">{stat.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
