"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const featuredProjects = [
  {
    id: 1,
    title: "Nature's Way Wellness",
    category: "Health & Supplements",
    description:
      "Complete product photography suite for Nature's Way's Chlorofresh line, featuring both clean tabletop shots and lifestyle imagery that showcases the product's natural, health-focused positioning.",
    images: [
      "/DSC_0632-Edit.png",
      "/portfolio/10.png",
      "/portfolio/6.png",
    ]
  },
  {
    id: 2,
    title: "Q+A Skincare Series",
    category: "Skincare & Beauty",
    description:
      "Dynamic product photography for Q+A’s facial serums, captured in bright, clean compositions that highlight the brand’s minimalist aesthetic and clinical benefits. This project focused on showcasing ingredient transparency, skincare functionality, and a fresh, science-forward look that resonates with health-conscious consumers.",
     images: [
      "/portfolio/20.png",
      "/portfolio/3.png",
      "/portfolio/13.png",
    ]
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const projectVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 1, 1] as [number, number, number, number],
    },
  },
}

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 1, 1] as [number, number, number, number],
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 1, 1] as [number, number, number, number],
    },
  },
}

export default function FeaturedWork() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">Featured Work</h2>
          <motion.div
            className="w-24 h-px bg-black mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="max-w-7xl mx-auto space-y-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProjects.map((project, index) => (
            <motion.div key={project.id} className="grid lg:grid-cols-2 gap-16 items-center" variants={projectVariants}>
              <motion.div className={`${index % 2 === 1 ? "lg:order-2" : ""} space-y-6`} variants={textVariants}>
                <motion.div
                  className="mb-4 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{project.category}</span>
                </motion.div>

                <motion.h3
                  className="text-3xl md:text-4xl font-light mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  className="text-gray-600 leading-relaxed mb-6 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {project.description}
                </motion.p>


              </motion.div>

              <motion.div className={`${index % 2 === 1 ? "lg:order-1" : ""}`} variants={imageVariants}>
                <div className="grid grid-cols-2 gap-4">
                  {project.images.map((image, imgIndex) => (
                    <motion.div
                      key={imgIndex}
                      className={`relative overflow-hidden rounded-lg group ${
                        imgIndex === 0 ? "col-span-2 aspect-[3/2]" : "aspect-square"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: imgIndex * 0.1,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} ${imgIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/0"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {["/portfolio/15.png", "/portfolio/8.png"].map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={index === 0 ? "WeightWorld wellness lifestyle" : "Magnesium supplement with healthy food"}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
          <motion.p
            className="text-gray-600 mt-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            From wellness products to luxury cosmetics, we create imagery that tells your brand&apos;s story
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
