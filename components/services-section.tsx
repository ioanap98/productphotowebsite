"use client"

import { Camera, Users, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    icon: Camera,
    title: "Product Photography",
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
    <section id="services" className="py-24 bg-gray-50">
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
            className="w-24 h-px bg-black mx-auto"
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
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-500"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <service.icon className="w-10 h-10 text-black" />
                </motion.div>
              </div>
              <motion.h3
                className="text-2xl font-light mb-4"
                whileHover={{ color: "#374151" }}
                transition={{ duration: 0.3 }}
              >
                {service.title}
              </motion.h3>
              <motion.p
                className="text-gray-600 leading-relaxed"
                whileHover={{ color: "#4B5563" }}
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
            className="bg-white rounded-2xl p-12 shadow-lg max-w-4xl mx-auto"
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
                    className="text-4xl font-bold text-black mb-2"
                    whileHover={{ scale: 1.2, color: "#059669" }}
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
