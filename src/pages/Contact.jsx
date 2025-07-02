import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import contactImage from "../assets/Image/profile_image.jpg"; // Replace with your image path
import toast from "react-hot-toast";

const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.3,
            duration: 0.6,
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};
const handleForm = (e) => {
    e.preventDefault()
       const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    toast.success(`Forwarded message from ${data.email}`)

}
const Contact = () => {
    return (
        <motion.div
            className="min-h-screen flex flex-col justify-center items-center py-28 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Header */}
            <motion.div
                className="max-w-3xl text-center space-y-4 mb-10"
                variants={itemVariants}
            >
                <h1 className="text-4xl font-bold text-green-700 dark:text-green-400">
                    Get in Touch
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Have questions, suggestions, or want to collaborate? We'd love to hear
                    from you. Feel free to reach out via the details below or send us a
                    message using the form.
                </p>
            </motion.div>

            <motion.div
                className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
                variants={itemVariants}
            >
                {/* Left Side - Image */}
                <motion.div
                    className="space-y-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <img
                        src={contactImage}
                        alt="Contact Us"
                        className="w-full rounded-full shadow-lg"
                    />
                </motion.div>

                {/* Right Side - Contact Info + Form */}
                <motion.div className="space-y-6" variants={itemVariants}>
                    {/* Contact info blocks */}
                    <motion.div className="flex items-start gap-4" variants={itemVariants}>
                        <Mail size={24} className="text-green-600 dark:text-green-400" />
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                                Email
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                sujanban223@gmail.com
                            </p>
                        </div>
                    </motion.div>

                    <motion.div className="flex items-start gap-4" variants={itemVariants}>
                        <MapPin size={24} className="text-green-600 dark:text-green-400" />
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                                Address
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Raojan, Chattgram, Bangladesh
                            </p>
                        </div>
                    </motion.div>

                    <motion.div className="flex items-start gap-4" variants={itemVariants}>
                        <Phone size={24} className="text-green-600 dark:text-green-400" />
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                                Phone
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                +880 1334 567890
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact form */}
                    <motion.form onSubmit={handleForm} className="mt-8 space-y-4" variants={itemVariants}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            name="name"
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            name="email"
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="4"
                            name="message"
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
                        >
                            Send Message
                        </button>
                    </motion.form>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Contact;
